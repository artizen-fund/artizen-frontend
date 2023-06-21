import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions, Button, PagePadding, CuratorCheck } from '@components'
import { typography } from '@theme'
import { useDateHelpers, LayoutContext } from '@lib'
import { capitalCase } from 'capital-case'
import { useSeasons } from 'src/lib/useSeasons'
import { size } from 'lodash'

export default function SeasonPage(): JSX.Element {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const { formatDate, getSeasonStatus, isOpenForSubmissions } = useDateHelpers()
  const {
    query: { id },
    push,
  } = useRouter()
  const {
    loading,
    data: loadedSeasonsData,
    error,
  } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  const { closeSeason } = useSeasons()

  console.log('error  ', error)
  console.log('loadedSeasonsData  ', loadedSeasonsData)

  return (
    <Layout>
      <StyledPagePadding>
        {loading ? (
          <Spinner />
        ) : (
          loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
            const id = `submission-container-id-${season.id}`
            const startingDate = formatDate(season.startingDate)
            const endingDate = formatDate(season.endingDate)
            const seasonStatus = getSeasonStatus(season.startingDate, season.endingDate)?.toLocaleUpperCase()
            return (
              <Wrapper key={id} id={id}>
                <Title className="expand" id={`submission-title-${season.title}`}>
                  {season.title && capitalCase(season.title)}
                </Title>

                <Title id={`submission-status-${seasonStatus}`}>
                  <span style={{ fontWeight: 10 }}>status: </span>
                  {capitalCase(seasonStatus)}
                </Title>

                {!isOpenForSubmissions(season.startingDate, season.endingDate) && (
                  <span
                    style={{ fontWeight: 10, fontSize: 18, textDecoration: 'underline' }}
                    className="right-align"
                    onClick={() => closeSeason(season.index)}
                  >
                    Close Season
                  </span>
                )}

                <Subtitle
                  id={`submission-startingDate-${season.startingDate}`}
                >{`This season runs from ${startingDate} to ${endingDate}`}</Subtitle>

                <MatchFoundMoney className="right-align">
                  <span style={{ fontWeight: 10 }}>Match Fund: </span> {season.matchFundPooled}{' '}
                  <a
                    style={{ fontWeight: 10, fontSize: 18, textDecoration: 'underline' }}
                    onClick={() => {
                      setVisibleModalWithAttrs('updateMatchFundsSeasonAmount', {
                        season,
                      })
                    }}
                  >
                    edit
                  </a>
                </MatchFoundMoney>

                <div>
                  <Subtitle>Projects submitted to this Season:</Subtitle>
                  {isOpenForSubmissions(season.startingDate, season.endingDate) && (
                    <Button level={2} onClick={() => push('/admin/projects')}>
                      Submit a project
                    </Button>
                  )}
                </div>

                <SubmissionsWrapper>
                  <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
                </SubmissionsWrapper>
              </Wrapper>
            )
          })
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const MatchFoundMoney = styled.div`
  ${typography.title.l3}
`

const SubmissionsWrapper = styled.div`
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-rows: 50px 50px;
  grid-template-columns: 2fr 1fr;
  .expand {
    grid-column: 1 / 3;
  }

  .right-align {
    justify-self: end;
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
  ${typography.body.l1}
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`
const CloseButton = styled(props => <Button {...props} />)`
  width: 160px;
`
