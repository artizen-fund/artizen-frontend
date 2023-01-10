import { useState } from 'react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { ICheckForExistingArtizenHandleQuery, IUpdateUsersMutation } from '@types'
import { loggedInUserVar, useCloudinary } from '@lib'
import { UPDATE_USER, CHECK_FOR_EXISTING_ARTIZENHANDLE } from '@gql'
import { initialState, FormState } from '@forms/createProfile'

const useCreateProfile = () => {
  const { upload } = useCloudinary()

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const [data, setData] = useState<FormState>(initialState)
  const [imageFile, setImageFile] = useState<File>()
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USER)

  /* this checks for existing handles while the user types */
  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  useQuery<ICheckForExistingArtizenHandleQuery>(CHECK_FOR_EXISTING_ARTIZENHANDLE, {
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
    if (!loggedInUser) {
      throw new Error('User session not found')
    }
    const profileImage = await uploadAvatar(imageFile)
    await updateUser({
      variables: {
        ...loggedInUser,
        ...data,
        artizenHandle: data.artizenHandle?.toLowerCase() || loggedInUser.artizenHandle,
        profileImage,
      },
    })
    await addUserToCourier()
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

  return { createProfile, additionalErrors, data, setData, setImageFile }
}

export default useCreateProfile
