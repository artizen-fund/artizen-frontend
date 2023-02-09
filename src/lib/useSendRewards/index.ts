import { IMemberFragment, IGrantFragment } from '@types'
import { useMutation, useLazyQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { UPDATE_GRANTS, GET_USERS_AND_CURATORS } from '@gql'
import { PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, useFullSignOut, useSmartContracts, assert } from '@lib'

export const useSendRewards = () => {
  const { grantsContract } = useSmartContracts()
  const { disconnectAndSignout } = useFullSignOut()
  const [getUser] = useLazyQuery(GET_USERS_AND_CURATORS, {
    fetchPolicy: 'no-cache',
  })
  const [updateGrant, { error: updatingGrantError }] = useMutation(UPDATE_GRANTS)

  if (updatingGrantError) {
    throw new Error('Updating Grant Error, error= ', updatingGrantError)
  }

  const updatingGrantFn = async (topDonorWinnerId: string, grantId: string) => {
    console.log('it gets to here')
    const { data } = await updateGrant({
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

    const updatedGrant = data.update_Grants.returning

    if (updatedGrant.length === 0) {
      throw new Error('Grant has not been updated')
    }

    console.log('updateGrantR   ', updatedGrant[0])

    return updatedGrant[0]
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

  const getLeadProjectMember = async (grant: IGrantFragment) => {
    const memberArray = grant.submission?.project?.members

    const projectLeadUser = memberArray?.filter((member: IMemberFragment) => member.type === 'lead')[0].user

    if (!projectLeadUser) {
      throw new Error('Notification cannot be sent because there is not lead member')
    }

    return projectLeadUser
  }

  const sendNotificationRequest = async (data: any, template: string) => {
    const sendNotificationRt = await fetch('/api/sendNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        email: 'rubelux@gmail.com',
        template,
      }),
    })

    if (sendNotificationRt.status === 500) {
      console.error('Notification has not been sent')
    }
  }

  const sendNotificationToProjectAuthor = async (grant: IGrantFragment) => {
    const TEMPLATE_ID = assert(PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID, 'PROJECT_LEAD_NOTIFICATION_TEMPLATE_ID')

    const projectLeadMember = await getLeadProjectMember(grant)

    const grantPatronArtifact = grant.submission?.artifacts.filter(({ edition }) => edition === 'creator')[0]

    const grantDate = moment(grant.startingDate)

    const etherScanDomain =
      process.env.NEXT_PUBLIC_PROD === 'false' ? 'https://goerli.etherscan.io/' : 'https://etherscan.io/'

    const openSeaDomain =
      process.env.NEXT_PUBLIC_PROD === 'false'
        ? 'https://testnets.opensea.io/assets/goerli/'
        : 'https://opensea.io/assets/ethereum/'

    const notificationVar = {
      grantCreatorArtifactName: 'creator',
      grantDay: grantDate.day(),
      grantMonth: grantDate.month(),
      grantAwardAmount: 0, // TODO: finish added the total amount
      grantProjectName: grant.submission?.project?.title,
      firstName: projectLeadMember.firstName,
      grantCreatorWalletAddress: grant.submission?.project?.walletAddress,
      pageGrantArtifactOpenseaURL: `${openSeaDomain}${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}/${grantPatronArtifact?.token}`,
      pageBlockchainArtifactURL: `${etherScanDomain}address/${process.env.NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS}`,
    }

    await sendNotificationRequest(notificationVar, TEMPLATE_ID)
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

    const updatedGrant = await updatingGrantFn(topDonorWinnerId, String(grantId))

    await sendNotificationToProjectAuthor(updatedGrant)

    alert('Grant ended')
  }

  return { sendRewards }
}
