import Error from 'next/error'
import { usePrivy } from '@privy-io/react-auth'
import { useReactiveVar } from '@apollo/client'
import { loggedInUserVar } from '@lib'

const CuratorCheck = () => {
  const { authenticated, ready } = usePrivy()
  const loggedInUser = useReactiveVar(loggedInUserVar)

  if ((ready && !authenticated) || (loggedInUser?.curators && loggedInUser.curators.length === 0)) {
    return <Error statusCode={400} />
  }
  return <></>
}

export default CuratorCheck
