import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { CuratorCheck, Layout, ViewGrant, Spinner } from '@components'
import { LOAD_GRANTS } from '@gql'
import { ILoadGrantsQuery } from '@types'

const GrantDetails = () => {
  const { status } = useSession()

  const {
    query: { id },
  } = useRouter()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: id === undefined,
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  useEffect(() => {
    if (!errorLoadingGrant) return
    console.error('errorLoadingGrant', errorLoadingGrant)
  }, [errorLoadingGrant])

  return (
    <Layout>
      <CuratorCheck />
      {status !== 'authenticated' || loading ? (
        <Spinner minHeight="75vh" />
      ) : (
        <>
          <ViewGrant grant={loadedGrantData?.Grants[0]} />
        </>
      )}
    </Layout>
  )
}

export default GrantDetails
