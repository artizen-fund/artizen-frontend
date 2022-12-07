import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Grants, Layout } from '@components'
import { loggedInUserVar } from '@lib'
import { useRouter } from 'next/router'

const ManageGrants = () => {
  const router = useRouter()
  const loggedInUser = useReactiveVar(loggedInUserVar)

  useEffect(() => {
    if (!loggedInUser) router.push('/')
  }, [loggedInUser])

  return (
    <Layout>
      <Grants />
    </Layout>
  )
}

export default ManageGrants
