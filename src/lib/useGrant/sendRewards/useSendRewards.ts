import { assert } from '../../assert'
import { GrantsAbi } from '@contracts'
import { useContract, useSigner } from 'wagmi'
import { useMutation, useLazyQuery } from '@apollo/client'
import { UPDATE_GRANTS, GET_USERS_AND_CURATORS, LOAD_GRANTS } from '@gql'
import { sendNotification, PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, useFullSignOut } from '@lib'

export const useSendRewards = () => {
  const { data: signer } = useSigner()
  const { disconnectAndSignout } = useFullSignOut()
  const [getUser, { data }] = useLazyQuery(GET_USERS_AND_CURATORS, {
    fetchPolicy: 'no-cache',
  })
  const [getGrant] = useLazyQuery(LOAD_GRANTS, { fetchPolicy: 'network-only' })
  const [updateGrant, { error: updatingGrantError }] = useMutation(UPDATE_GRANTS)

  if (updatingGrantError) {
    throw new Error('Updating Grant Error, error= ', updatingGrantError)
  }

  const grantContractAddress = assert(
    process.env.NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS',
  )

  const grantsContract = useContract({
    address: grantContractAddress,
    abi: GrantsAbi,
    signerOrProvider: signer,
  })

  const updatingGrantFn = async (topDonorWinnerId: string, grantId: string) => {
    console.log('it gets to here')
    const updateGrantR = await updateGrant({
      variables: {
        _set: {
          status: 'rewarded',
          topDonorWinnerId,
        },
        where: {
          blockchainId: {
            _eq: grantId,
          },
        },
      },
    })

    console.log('updateGrantR   ', updateGrantR)

    return updateGrantR
  }

  const getUserFn = async (userWallet: string) => {
    console.log('userWallet   ', userWallet)
    try {
      const dataHere = await getUser({
        variables: {
          where: {
            publicAddress: {
              _eq: userWallet,
            },
          },
        },
      })
      console.log('data here', dataHere)
    } catch (error) {
      console.log('error', error)
    }

    // if (returnData.data.Users.length === 0) {
    //   throw new Error('User does not exist')
    // }

    // return returnData.data.Users[0].id
  }

  const sendNotificationToProjectAuthor = async (grantId: string) => {
    const TEMPLATE_ID = assert(PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, 'PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID')
    console.log('projectWallet  ', grantId)

    const { data } = await getGrant({
      variables: {
        limit: 1,
        where: {
          blockchainId: {
            _eq: grantId,
          },
          submission: {
            project: {
              members: {
                type: {
                  _eq: 'lead',
                },
              },
            },
          },
        },
      },
    })

    const memberArray = data.Grants[0].submission.project.members

    const projectLeadMember = memberArray.filter(member => member.type === 'lead')[0].user

    console.log('projectLeadMember   ', projectLeadMember)

    if (!projectLeadMember) {
      throw new Error('Notification cannot be sent because there is not lead member')
    }

    console.log('projectLeadMember   ', projectLeadMember)
    console.log('TEMPLATE_ID  ', TEMPLATE_ID)

    // const topDonorWinnerId = await getProject(grantData.topDonor.toLowerCase())
    //sendNotificationAPI

    const sendNotificationRaw = await fetch('/api/sendNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { firstName: projectLeadMember.firstName },
        email: 'rubelux@gmail.com',
        template: TEMPLATE_ID,
      }),
    })

    const sendNotification = await sendNotificationRaw.json()

    console.log('sendNotification  ', sendNotification)

    // await sendNotification(
    //   {
    //     firstName: projectLeadMember.firstName,
    //   },
    //   TEMPLATE_ID,
    //   'rubelux@gmail.com',
    // )
  }

  const updateGrantRecordAfterSendingRewards = async (grantId: number, topDonorWallet: string) => {
    const topDonorWinnerId = await getUserFn(topDonorWallet)
    console.log('topDonorWinnerId  ', topDonorWinnerId)
    // await updatingGrantFn(topDonorWinnerId, String(grantId))
  }

  const sendRewards = async (grantId: number, projectWallet: string) => {
    console.log('it gets sendRewards')
    let grantData
    try {
      grantData = await grantsContract?.grants(grantId)
    } catch (e) {
      console.error('Error loading grant ', e)
      disconnectAndSignout()
    }

    // const grantTransaction = await grantsContract?.sendRewards(grantId, projectWallet)
    // await grantTransaction.wait()

    await updateGrantRecordAfterSendingRewards(grantId, grantData.topDonor.toLowerCase())

    // await sendNotificationToProjectAuthor(String(grantId))

    // alert('Grant ended')
  }

  return { sendRewards }
}
