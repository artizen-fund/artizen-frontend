import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { faq } from '@copy/admin'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions, Button, PagePadding, CuratorCheck, Faq } from '@components'
import { typography } from '@theme'
import { useDateHelpers, LayoutContext } from '@lib'
import { startCase } from 'lodash'
import { useSeasons } from 'src/lib/useSeasons'

export default function SeasonPage(): JSX.Element {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const { formatDate, getSeasonStatus, isOpenForSubmissions, isSeasonEnded } = useDateHelpers()
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

  return (
    <Layout>
      <CuratorCheck />
      <StyledPagePadding>
        {loading ? (
          <Spinner />
        ) : (
          loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
            const id = `submission-container-id-${season.id}`
            const startingDate = formatDate(season.startingDate)
            const endingDate = formatDate(season.endingDate)
            const seasonStatus = getSeasonStatus(season.startingDate, season.endingDate)?.toLocaleUpperCase()
            const isSeasonEndedV: boolean = season.isClosed || isSeasonEnded(season.startingDate, season.endingDate)
            const isOpenForSubmissionsV: boolean = isOpenForSubmissions(season.startingDate, season.endingDate)

            return (
              <Wrapper key={id} id={id}>
                <Title id={`submission-title-${season.title}`}>{season.title && startCase(season.title)}</Title>

                {isSeasonEndedV && !season.isClosed && (
                  <span
                    style={{ fontWeight: 10, fontSize: 18, textDecoration: 'underline' }}
                    className="right-align"
                    onClick={() => closeSeason(season.index)}
                  >
                    Close Season
                  </span>
                )}

                <Subtitle id={`submission-status-${seasonStatus}`}>
                  Status:
                  <span style={{ fontWeight: 'bold' }}>{startCase(seasonStatus)}</span>
                </Subtitle>

                <Subtitle className={isOpenForSubmissionsV ? '' : 'right-align'}>
                  <span style={{ fontWeight: 10 }}>Match Fund: </span> {season.matchFundPooled}{' '}
                  {isOpenForSubmissionsV && (
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
                  )}
                </Subtitle>

                <div className="expand">
                  <Subtitle
                    style={{ float: 'left' }}
                  >{`This season runs from ${startingDate} to ${endingDate}`}</Subtitle>

                  <div className="right-align" style={{ float: 'right' }}>
                    {isOpenForSubmissionsV && (
                      <Button level={2} onClick={() => push('/admin/projects')}>
                        Submit a project
                      </Button>
                    )}
                  </div>
                </div>

                <Title style={{ margin: '32px 0 0 0' }} className="expand">
                  Projects submitted to this Season:
                </Title>

                <SubmissionsWrapper>
                  <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
                </SubmissionsWrapper>
              </Wrapper>
            )
          })
        )}
      </StyledPagePadding>
      <div className="doubleWith">
        <Faq copy={faq} />
      </div>
    </Layout>
  )
}

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
