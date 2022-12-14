import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { Layout, Button, Spinner } from '@components'
import { useRouter } from 'next/router'
import { LOAD_GRANTS } from '@gql'
import styled from 'styled-components'
import { typography } from '@theme'
import { ILoadGrantsQuery, IGrantsWithProjectFragment } from '@types'
import moment from 'moment-timezone'

const ManageGrants = () => {
  const router = useRouter()

  const { status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status])

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    variables: {
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  const openGrant = (target: string) => () => {
    console.log('tarrget   ', target)
    router.push(`/admin/grants/${target}`)
  }

  console.log('loadedGrantData   ', loadedGrantData)

  //moment(grant?.closingDate).add(1, 's')

  return (
    <Layout>
      {status !== 'authenticated' ? (
        <Spinner />
      ) : (
        <PageLayout>
          <TextSections>Grant List:</TextSections>
          <GrantsLayout>
            {loadedGrantData?.Grants.map((grant: IGrantsWithProjectFragment) => {
              const startingDate = moment(grant.startingDate).format('DD-MM-YYYY hh:mm:ss')
              const closingDate = moment(grant.startingDate).format('DD-MM-YYYY hh:mm:ss')
              return (
                <GrantItem onClick={openGrant(grant.id)} key={grant.id} highlighed={grant.status === 'open'}>
                  <GrantDate>
                    Starting date: <span>{startingDate}</span>
                  </GrantDate>
                  <GrantDate>
                    Ending date: <span>{closingDate}</span>
                  </GrantDate>
                  <GrantStatus>{grant.status}</GrantStatus>
                </GrantItem>
              )
            })}
          </GrantsLayout>
          <ButtonWrapper>
            <Button onClick={openGrant('new')}>CREATE NEW GRANT</Button>
          </ButtonWrapper>
        </PageLayout>
      )}
    </Layout>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 80%;
  margin: 4rem auto;
`

const PageLayout = styled.div`
  width: 100%;
`

const TextSections = styled.div`
  ${typography.title.l2}
  width: 80%;
  margin: 3rem auto 0;
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
  margin: 3rem auto 4rem;
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'GrantDate GrantStatus';

  .highlighed {
    background-color: rgba(217, 219, 224, 1);
  }
`

export default ManageGrants
