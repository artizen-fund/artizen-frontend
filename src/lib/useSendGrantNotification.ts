import { useApolloClient, useMutation } from '@apollo/client'

export const useSendGrantNotification = () => {
  const sendTopDonor = (GrantId: string) => {
    console.log('sendTopDonor')
  }

  return { sendTopDonor }
}
