import { CourierProvider, ICourierMessage } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'
import { useSession, getUSDCBalance, isServer, envString } from '@lib'

export const Toaster = () => {
  const user = useSession()
  if (isServer()) return <></>

  const handleBalance = async () => {
    if (user?.publicAddress) {
      const balance = await getUSDCBalance(user.publicAddress)
      console.log('user balance', balance)
    }
  }

  const handleOnMessage = (message?: ICourierMessage) => {
    handleBalance()
    return message
  }
  
  /* note: this chokes on props.children, investigate later 
  return (
    <CourierProvider
      userId={user?.id}
      clientKey={envString('NEXT_PUBLIC_COURIER_CLIENT_KEY')}
      onMessage={handleOnMessage}
    >
      <Toast />
    </CourierProvider>
  )
  */

  return (
    <></>
  )
}