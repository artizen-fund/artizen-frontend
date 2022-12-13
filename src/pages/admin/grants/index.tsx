import { useEffect } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
import { Grants, Layout } from '@components'
import { loggedInUserVar } from '@lib'
import { useRouter } from 'next/router'
import { LOAD_GRANTS } from '@gql'
import styled from 'styled-components'
import { typography } from '@theme'
import { ILoadGrantsQuery, IGrantsWithProjectAndDonationsFragment } from '@types'

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

  const openGrant = (target: string) => () => {
    console.log('tarrget   ', target)
    router.push(`/admin/grants/${target}`)
  }

  console.log('loadedGrantData   ', loadedGrantData)

  return (
    <Layout>
      <TextSections>Grant List:</TextSections>
      <GrantsLayout>
        {loadedGrantData?.Grants.map((grant: IGrantsWithProjectAndDonationsFragment) => (
          <GrantItem onClick={openGrant(grant.date)} key={grant.id} highlighed={grant.status === 'open'}>
            <GrantDate>
              DATE: <span>{grant.date}</span>
            </GrantDate>
            <GrantStatus>{grant.status}</GrantStatus>
          </GrantItem>
        ))}
      </GrantsLayout>
    </Layout>
  )
}

const TextSections = styled.div`
  ${typography.title.l2}
`

const GrantDate = styled.div`
  display: block;
  ${typography.title.l4}
  span {
  }
`

const GrantStatus = styled.span`
  display: block;
`

const GrantsLayout = styled.div`
  width: 80%;
  height: 500px;
  margin: 3rem auto 0;
  overflow-y: scroll;
`

const GrantItem = styled.div<{ highlighed: boolean }>`
  width: 100%;
  height: 100px;
  display: grid;
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  margin: 10px 0;
  text-align: center;
  background-color: ${props => (props.highlighed ? 'rgba(217, 219, 224, 0.64);' : 'rgba(217, 219, 224, 0.24);')};
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas: 'GrantDate GrantStatus';

  .highlighed {
    background-color: rgba(217, 219, 224, 1);
  }
`

export default ManageGrants
