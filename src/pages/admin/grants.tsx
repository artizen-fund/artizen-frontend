import { useContext } from 'react'
import { Grants, Layout, Button } from '@components'
import { LayoutContext, UserContext } from '@lib'

const ManageGrants = () => {
  const { setVisibleModal } = useContext(LayoutContext)
  const { loggedInUser } = useContext(UserContext)

  // todo: use instead?
  // const { data: session } = useSession()
  // const { isConnected } = useAccount()

  return (
    <Layout>
      {!loggedInUser && <Button onClick={() => setVisibleModal?.('login')}>Login</Button>}
      <Grants />
    </Layout>
  )
}

export default ManageGrants
