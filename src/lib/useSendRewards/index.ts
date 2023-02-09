import { IMemberFragment, IUsers } from '@types'
import { useMutation, useLazyQuery } from '@apollo/client'
import { UPDATE_GRANTS, GET_USERS_AND_CURATORS, LOAD_GRANTS } from '@gql'
import { PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, useFullSignOut, useSmartContracts, assert } from '@lib'

export const useSendRewards = () => {
  const { grantsContract } = useSmartContracts()
  const { disconnectAndSignout } = useFullSignOut()
  const [getUser] = useLazyQuery(GET_USERS_AND_CURATORS, {
    fetchPolicy: 'no-cache',
  })
  const [getGrant] = useLazyQuery(LOAD_GRANTS, { fetchPolicy: 'network-only' })
  const [updateGrant, { error: updatingGrantError }] = useMutation(UPDATE_GRANTS)

  if (updatingGrantError) {
    throw new Error('Updating Grant Error, error= ', updatingGrantError)
  }

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
    const { data } = await getUser({
      variables: {
        where: {
          publicAddress: {
            _eq: userWallet,
          },
        },
      },
    })

    if (data.Users.length === 0) {
      throw new Error('User does not exist')
    }

    return data.Users[0].id
  }

  const getLeadProjectMember = async (grantId: string) => {
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

    if (data.Grants.length === 0) {
      throw new Error('Grant does not exits')
    }

    const memberArray = data.Grants[0].submission.project.members

    const projectLeadUser = memberArray.filter((member: IMemberFragment) => member.type === 'lead')[0].user

    console.log('projectLeadMember   ', projectLeadUser)

    if (!projectLeadUser) {
      throw new Error('Notification cannot be sent because there is not lead member')
    }

    return projectLeadUser
  }

  const sendNotificationRequest = async (template: string, projectLeadMember: IUsers) => {
    const sendNotificationRt = await fetch('/api/sendNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { firstName: projectLeadMember.firstName },
        email: 'rubelux@gmail.com',
        template,
      }),
    })

    if (sendNotificationRt.status === 500) {
      console.error('Notification has not been sent')
    }
  }

  const sendNotificationToProjectAuthor = async (grantId: string) => {
    const TEMPLATE_ID = assert(PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, 'PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID')
    console.log('projectWallet  ', grantId)

    const projectLeadMember = await getLeadProjectMember(grantId)

    console.log('projectLeadMember   ', projectLeadMember)

    await sendNotificationRequest(TEMPLATE_ID, projectLeadMember)
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

    const grantTransaction = await grantsContract?.sendRewards(grantId, projectWallet)
    await grantTransaction.wait()

    const topDonorWinnerId = await getUserFn(grantData.topDonor.toLowerCase())
    console.log('topDonorWinnerId  ', topDonorWinnerId)

    await updatingGrantFn(topDonorWinnerId, String(grantId))

    await sendNotificationToProjectAuthor(String(grantId))

    alert('Grant ended')
  }

  return { sendRewards }
}
