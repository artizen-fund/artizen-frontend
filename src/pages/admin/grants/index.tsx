import { useEffect } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
import { Grants, Layout } from '@components'
import { loggedInUserVar } from '@lib'
import { useRouter } from 'next/router'
import { LOAD_GRANTS } from '@gql'

import { ILoadGrantsQuery } from '@types'

const ManageGrants = () => {
  const router = useRouter()
  const loggedInUser = useReactiveVar(loggedInUserVar)

  useEffect(() => {
    console.log('loggedInUser  ', loggedInUser)
    // if (!loggedInUser) router.push('/')
  }, [loggedInUser])

  const { loading, data: loadedGrantData, error: errorLoadingGrant } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS)

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  console.log('loadedGrantData   ', loadedGrantData)

  return (
    <Layout>
      <Grants />
    </Layout>
  )
}

export default ManageGrants
