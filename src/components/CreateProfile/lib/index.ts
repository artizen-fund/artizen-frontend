import { useState, useEffect } from 'react'
import * as validateLib from 'wallet-address-validator'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { ICheckForExistingArtizenHandleQuery, IUpdateUsersMutation, ICreateUsersMutation } from '@types'
import { loggedInUserVar, useCloudinary } from '@lib'
import { UPDATE_USERS, CHECK_FOR_EXISTING_ARTIZENHANDLE, CREATE_USERS } from '@gql'
import { FormState, FormStateAdmin } from '@forms/createProfile'

const useCreateProfile = (initialFormState: FormState | FormStateAdmin) => {
  const { upload } = useCloudinary()

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const [data, setData] = useState<FormState>(initialFormState)
  const [imageFile, setImageFile] = useState<File>()
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USERS, {
    onError: error => console.error('UPDATE_USERS error ', error),
  })
  const [createUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)

  const [newArtizenHandle] = useDebounce(data.artizenHandle, 500)
  const [newPublicWallet] = useDebounce(data.publicAddress, 500)
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
      if (Users.length > 0) {
        additionalErrors.push({
          instancePath: '/artizenHandle',
          message: 'Handle is already in use',
          schemaPath: '#/properties/artizenHandle',
          keyword: '',
          params: {},
        })

        setAdditionalErrors(additionalErrors)
      }
    },
  })

  useEffect(() => {
    if (newPublicWallet && !validateLib.validate(newPublicWallet, 'ETH')) {
      additionalErrors.push({
        instancePath: '/publicAddress',
        message: 'Invalid ETH address',
        schemaPath: '#/properties/publicAddress',
        keyword: '',
        params: {},
      })

      setAdditionalErrors(additionalErrors)
    } else {
      const newArray = additionalErrors.filter(error => error.instancePath !== '/publicAddress')
      setAdditionalErrors(newArray)
    }
  }, [newPublicWallet])

  const sendUserToCourier = async (id: string, email: string, artizenHandle: string) => {
    await addUserToCourier({
      id,
      email,
      artizenHandle,
      type: 'addNewUser',
    })
  }

  const createProfile = async () => {
    const profileImage = await uploadAvatar(imageFile)

    const newUserMutationReturn = await createUser({
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

    if (!newUserMutationReturn.data?.insert_Users) {
      throw new Error('Error creating users in the admin form')
    }

    const newUser = newUserMutationReturn.data.insert_Users.returning[0]

    // If there is a change in email, or artizenHandle, update profile in Courier
    if (newUser.email && newUser.artizenHandle) {
      await sendUserToCourier(newUser.id, newUser.email, newUser.artizenHandle)
    }
    return newUserMutationReturn.data.insert_Users.returning[0]
  }

  const updateProfile = async (userIdToUpdate: string, sendWelcomeEmail: boolean) => {
    if (!loggedInUser) {
      throw new Error('User session not found')
    }

    const valuesToUpdate: FormState = {}

    Object.keys(data).forEach(key => {
      //values are different
      if (data[key] !== initialFormState[key]) {
        return (valuesToUpdate[key] = key === 'artizenHandle' ? data[key]?.toLowerCase() : data[key])
      }
    })

    const profileImage = await uploadAvatar(imageFile)

    const userId = userIdToUpdate ? userIdToUpdate : loggedInUser.id ? loggedInUser.id : ''

    if (!userId) {
      throw new Error('User id not found')
    }

    const updatedUser = await updateUser({
      variables: {
        where: {
          id: {
            _eq: userId,
          },
        },
        _set: { ...valuesToUpdate, claimed: sendWelcomeEmail, profileImage },
      },
      onError: error => console.error('error form ::::', error),
    })
    // If there is a change in email, or artizenHandle, update the user's profile in courier
    if (valuesToUpdate.email || valuesToUpdate.artizenHandle) {
      //grap the email from the form if it was changed, otherwise grap it from the initial form state
      const email = valuesToUpdate.email ? valuesToUpdate.email : initialFormState.email
      const artizenHandle = valuesToUpdate.artizenHandle ? valuesToUpdate.artizenHandle : initialFormState.artizenHandle

      email &&
        artizenHandle &&
        (await addUserToCourier({ id: userId as string, email, artizenHandle, type: 'updateUser' }))
    }

    if (updatedUser.data?.update_Users?.returning.length === 0) {
      throw new Error('Error updating user in the admin form')
    }

    if (
      sendWelcomeEmail &&
      updatedUser.data?.update_Users?.returning[0].email &&
      updatedUser.data?.update_Users?.returning[0].artizenHandle
    ) {
      await sendUserToCourier(
        updatedUser.data?.update_Users?.returning[0].id,
        updatedUser.data?.update_Users?.returning[0].email,
        updatedUser.data?.update_Users?.returning[0].artizenHandle,
      )
    }

    return updatedUser.data?.update_Users?.returning[0]
  }

  const uploadAvatar = async (imageFile?: File) => {
    if (!imageFile) return undefined
    const cloudinaryResponse = await upload(imageFile)
    return cloudinaryResponse?.secure_url
  }

  const addUserToCourier = async (data: ICourierAPI) => {
    await fetch('/api/syncCourier', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return { updateProfile, createProfile, additionalErrors, data, setData, setImageFile }
}

export default useCreateProfile
