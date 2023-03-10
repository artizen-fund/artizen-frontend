import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions, Button, PagePadding } from '@components'
import { typography } from '@theme'
import { useDateHelpers } from '@lib'

export default function SeasonPage(): JSX.Element {
  const { formatDate, getSeasonStatus } = useDateHelpers()
  const {
    query: { id },
    push,
  } = useRouter()
  const { loading, data: loadedSeasonsData } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
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

  console.log('loadedSeasonsData  ', loadedSeasonsData)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          <StyledPagePadding>
            {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
              const id = `submission-container-id-${season.id}`
              const startingDate = formatDate(season.startingDate)
              const endingDate = formatDate(season.endingDate)
              return (
                <Wrapper key={id} id={id}>
                  <Title id={`submission-title-${season.title}`}>{season.title?.toUpperCase()}</Title>
                  <Title className="right-align" id={`submission-status-${season.title}`}>
                    {getSeasonStatus(season.startingDate, season.endingDate)?.toLocaleUpperCase()}
                  </Title>
                  <Subtitle
                    className="expand"
                    id={`submission-startingDate-${season.startingDate}`}
                  >{`This Season is open from: ${startingDate} to: ${endingDate}`}</Subtitle>
                  <Subtitle>Projects submitted to this Season:</Subtitle>
                  <Button level={2} onClick={() => push('/admin/projects')}>
                    Submit a project
                  </Button>
                  <SubmissionsWrapper>
                    <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
                  </SubmissionsWrapper>
                </Wrapper>
              )
            })}
          </StyledPagePadding>
        </Layout>
      )}
    </>
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
