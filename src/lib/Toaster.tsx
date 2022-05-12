import { CourierProvider, ICourierMessage } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'
import { useSession, getUSDCBalance, isServer } from '@lib'

export const Toaster = () => {
  if (isServer()) return <></>
  const user = useSession()

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

  return (
    /* note: this chokes on props.children, investigate later */
    /* @ts-ignore */
    <CourierProvider
      userId={user?.id}
      clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY}
      onMessage={handleOnMessage}
    >
      <Toast />
    </CourierProvider>
  )
}
