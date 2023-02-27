import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { Layout, Button, Spinner, CuratorCheck, Table, TableCell, PagePadding } from '@components'
import { LOAD_SEASONS } from '@gql'
import { typography, palette } from '@theme'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { rgba, LayoutContext } from '@lib'

const Seasons = () => {
  const router = useRouter()
  const { status } = useSession()
  const { toggleModal } = useContext(LayoutContext)

  const {
    loading,
    data: loadedSeasonsData,
    error: errorLoadingSeasons,
  } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  const openSeason = (target: string) => () => {
    router.push(`/admin/seasons/${target}`)
  }

  const sideItem = (
    <Button
      onClick={() => {
        toggleModal('createSeasonModal')
      }}
      level={2}
      outline
    >
      Create New Season
    </Button>
  )

  return (
    <Layout>
      <CuratorCheck />
      {status !== 'authenticated' ? (
        <Spinner />
      ) : (
        <PagePadding>
          <StyledTable title="Season List" {...{ sideItem }}>
            {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
              const startingDate = moment(season.startingDate).format('MM-DD-YYYY HH:mm:ss')
              const endingDate = moment(season.endingDate).format('MM-DD-YYYY HH:mm:ss')
              return (
                <StyledTableCell onClick={openSeason(season.id)} key={season.id} highlight>
                  <Title>“{season.title}”</Title>
                  <DateLine>
                    <div>
                      Starts: <span>{startingDate}</span>
                    </div>
                    <div>
                      Ends: <span>{endingDate}</span>
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

const DateLine = styled.div`
  display: flex;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0 !important;
  ${typography.label.l3}
`

export default Seasons
