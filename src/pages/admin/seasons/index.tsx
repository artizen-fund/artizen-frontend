import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { faq } from '@copy/admin'
import { Layout, Button, CuratorCheck, Table, TableCell, PagePadding, Faq, Breadcrumbs } from '@components'
import { LOAD_SEASONS } from '@gql'
import { typography, palette } from '@theme'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { rgba, LayoutContext, useDateHelpers } from '@lib'
import { startCase } from 'lodash'

const Seasons = () => {
  const router = useRouter()
  const { toggleModal } = useContext(LayoutContext)
  const { formatDate, getSeasonStatus } = useDateHelpers()

  const { data: loadedSeasonsData, error } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: [
        {
          endingDate: 'desc',
        },
      ],
    },
  })

  if (error) {
    console.error('error', error)
  }

  const openSeason = (target: string) => () => {
    router.push(`/admin/seasons/${target}`)
  }

  const sideItem = (
    <Button
      onClick={async () => {
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
      <StyledPagePadding>
        <Breadcrumbs
          schema={[
            {
              path: '/admin',
              name: 'Admin',
              isActive: false,
            },
            {
              path: '/admin/seasons',
              name: 'Seasons',
              isActive: true,
            },
          ]}
        />
        <Table title="Season List" {...{ sideItem }}>
          {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
            const startingDate = formatDate(season.startingDate)
            const endingDate = formatDate(season.endingDate)
            const seasonStatus = getSeasonStatus(season.startingDate, season.endingDate)?.toLocaleUpperCase()

            return (
              <StyledTableCell onClick={openSeason(season.id)} key={season.id} highlight>
                <Title>{season.title && startCase(season.title)}</Title>
                <Status>{seasonStatus}</Status>
                <DateLine>
                  Runs from {startingDate} to {endingDate}
                </DateLine>
              </StyledTableCell>
            )
          })}
        </Table>
      </StyledPagePadding>
      <div className="doubleWith">
        <Faq copy={faq} />
      </div>
    </Layout>
  )
}

const StyledTableCell = styled(props => <TableCell {...props} />)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 96px;
  height: 64px;
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
  grid-row: 1/2;
  ${typography.label.l1}
`

const DateLine = styled.div`
  display: flex;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0 !important;
  ${typography.label.l3}
`

const Status = styled.div`
  ${typography.label.l2}
  color: ${palette.stone};
  text-transform: uppercase;
  self-align: flex-end;
  grid-row: 1/3;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

export default Seasons
