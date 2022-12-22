import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { Layout, Button, Spinner, CuratorCheck, Table, TableCell, PagePadding } from '@components'
import { LOAD_GRANTS } from '@gql'
import { typography, palette } from '@theme'
import { ILoadGrantsQuery, IGrantsWithProjectFragment } from '@types'
import { isCurrentGrant, rgba } from '@lib'

const ManageGrants = () => {
  const router = useRouter()
  const { status } = useSession()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  useEffect(() => {
    if (!errorLoadingGrant) return
    console.error('errorLoadingGrant', errorLoadingGrant)
  }, [errorLoadingGrant])

  const openGrant = (target: string) => () => {
    router.push(`/admin/grants/${target}`)
  }

  const sideItem = (
    <Button onClick={openGrant('new')} level={2} outline>
      Create new Grant
    </Button>
  )

  return (
    <Layout>
      <CuratorCheck />
      {status !== 'authenticated' ? (
        <Spinner />
      ) : (
        <PagePadding>
          <StyledTable title="Grant List" {...{ sideItem }}>
            {loadedGrantData?.Grants.map((grant: IGrantsWithProjectFragment) => {
              const startingDate = moment(grant.startingDate).format('MM-DD-YYYY HH:mm:ss')
              const closingDate = moment(grant.closingDate).format('MM-DD-YYYY HH:mm:ss')
              return (
                <StyledTableCell onClick={openGrant(grant.id)} key={grant.id} highlight>
                  <Title>“{grant.submission?.project?.title}”</Title>
                  <Status>
                    {isCurrentGrant(grant) && '👉 '}
                    {grant.status}
                  </Status>
                  <DateLine>
                    <div>
                      Starts: <span>{startingDate}</span>
                    </div>
                    <div>
                      Ends: <span>{closingDate}</span>
                    </div>
                  </DateLine>
                </StyledTableCell>
              )
            })}
          </StyledTable>
        </PagePadding>
      )}
    </Layout>
  )
}

const StyledTable = styled(props => <Table {...props} />)`
  max-width: 680px;
`

const StyledTableCell = styled(props => <TableCell {...props} />)`
  cursor: pointer;
  &:hover {
    background-color: ${rgba(palette.stone)};
  }
  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: ${rgba(palette.barracuda)};
    }
  }
`

const Title = styled.div`
  ${typography.label.l1}
  flex: 1;
`

const Status = styled.div`
  ${typography.label.l2}
`

const DateLine = styled.div`
  display: flex;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0 !important;
  ${typography.label.l3}
`

export default ManageGrants
