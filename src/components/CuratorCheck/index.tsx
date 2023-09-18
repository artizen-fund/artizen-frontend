import { useSession } from 'next-auth/react'
// import { useAccount } from 'wagmi'
import Error from 'next/error'

const CuratorCheck = () => {
  const { status, data } = useSession()
  // const { isConnected } = useAccount()

  if (status === 'unauthenticated' || (!!data && !data.user?.isCurator)) {
    return <Error statusCode={400} />
  }
  return <></>
}

export default CuratorCheck
