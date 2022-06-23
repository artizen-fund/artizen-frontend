import { CourierProvider, ICourierMessage } from '@trycourier/react-provider'
// import { Toast } from '@trycourier/react-toast'
// import { useSession, getUSDCBalance, isServer, assert } from '@lib'
import { useMagicLink, getUSDCBalance, isServer, assert } from '@lib'

export const Toaster = () => {
  const NEXT_PUBLIC_COURIER_CLIENT_KEY = assert(
    process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY,
    'NEXT_PUBLIC_COURIER_CLIENT_KEY',
  )

  const { user } = useMagicLink()
  if (isServer()) return <></>

  const handleBalance = async () => {
    if (user?.publicAddress) {
      const balance = await getUSDCBalance(user.publicAddress)
      // todo: do somehitng with this
    }
  }

  const handleOnMessage = (message?: ICourierMessage) => {
    handleBalance()
    return message
  }

  /* todo: Typescript is bugging out when <CourierProvider /> has children.
    <Toast />
  */
  return (
    <CourierProvider
      userId={user?.id}
      clientKey={NEXT_PUBLIC_COURIER_CLIENT_KEY}
      onMessage={handleOnMessage}
    ></CourierProvider>
  )

  return <></>
}
