import { useState } from 'react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { ICheckForExistingArtizenHandleQuery, IUpdateUsersMutation, ICreateUsersMutation } from '@types'
import { loggedInUserVar, useCloudinary } from '@lib'
import { UPDATE_USERS, CHECK_FOR_EXISTING_ARTIZENHANDLE, CREATE_USERS } from '@gql'
import { FormState } from '@forms/createProfile'

const useCreateProfile = (initialFormState: FormState) => {
  const { upload } = useCloudinary()

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const [data, setData] = useState<FormState>(initialFormState)
  const [imageFile, setImageFile] = useState<File>()
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USERS)
  const [createUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)

  /* this checks for existing handles while the user types */
  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  useQuery<ICheckForExistingArtizenHandleQuery>(CHECK_FOR_EXISTING_ARTIZENHANDLE, {
    skip: !!initialFormState,
    variables: {
      where: {
        _and: [{ artizenHandle: { _eq: newArtizenHandle?.toLowerCase() } }, { id: { _neq: loggedInUser?.id } }],
      },
    },
    onError: error => console.error('error ', error),
    fetchPolicy: 'no-cache',
    onCompleted: async ({ Users }) => {
      const errors: Array<ErrorObject> = []
      if (Users.length > 0) {
        errors.push({
          instancePath: '/artizenHandle',
          message: 'Handle is already in use',
          schemaPath: '#/properties/artizenHandle',
          keyword: '',
          params: {},
        })
      }
      setAdditionalErrors(errors)
    },
  })

  const createProfile = async () => {
    const profileImage = await uploadAvatar(imageFile)

    const createUserR = await createUser({
      variables: {
        objects: [
          {
            ...data,
            artizenHandle: data.artizenHandle?.toLowerCase(),
            profileImage,
          },
        ],
      },
    })
    await addUserToCourier()

    if (!createUserR.data?.insert_Users) {
      throw new Error('Error creating users in the admin form')
    }

    return createUserR.data?.insert_Users?.returning[0]
  }

  const updateProfile = async (userIdToUpdate: string) => {
    if (!loggedInUser) {
      throw new Error('User session not found')
    }

    let valuesToUpdate: FormState = {}
    let valuesTokeep: FormState = {}

    Object.keys(initialFormState).forEach(key => {
      //values are different
      if (initialFormState[key] !== data[key]) {
        valuesToUpdate[key] = key === 'artizenHandle' ? data[key]?.toLowerCase() : data[key]
      } else {
        valuesTokeep[key] = data[key]
      }
    })

    const profileImage = await uploadAvatar(imageFile)
    const updatedUser = await updateUser({
      variables: {
        where: {
          id: {
            _eq: userIdToUpdate,
          },
        },
        _set: { ...valuesToUpdate, profileImage },
        claimed: false,
      },
    })
    await addUserToCourier()

    if (!updatedUser.data?.update_Users?.returning) {
      throw new Error('Error updating user in the admin form')
    }

    return updatedUser.data?.update_Users?.returning[0]
  }

  const uploadAvatar = async (imageFile?: File) => {
    if (!imageFile) return undefined
    const cloudinaryResponse = await upload(imageFile)
    return cloudinaryResponse?.secure_url
  }

  const addUserToCourier = async () => {
    await fetch('/api/syncCourier', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: loggedInUser!.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    })
  }

  return { updateProfile, createProfile, additionalErrors, data, setData, setImageFile }
}

export default useCreateProfile
