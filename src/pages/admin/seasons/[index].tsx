import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions, Button } from '@components'
import { palette } from '@theme'
import { rgba } from '@lib'
import dayjs from 'dayjs'

export default function SeasonPage(): JSX.Element {
  const {
    query: { index },
    push,
  } = useRouter()
  const { loading, data: loadedSeasonsData } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: {
          _eq: index,
        },
      },
      order_by: [
        {
          startingDate: 'desc_nulls_last',
        },
      ],
    },
  })

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
            const id = `submission-container-id-${season.id}`
            const startingDate = dayjs(season.startingDate).format('MM-DD:HH:mm')
            const endingDate = dayjs(season.endingDate).format('MM-DD:HH:mm')
            return (
              <Wrapper key={id} id={id}>
                <Title id={`submission-title-${season.title}`}>{season.title}</Title>
                <Subtitle id={`submission-status-${season.title}`}>{'Running'}</Subtitle>
                <Subtitle
                  className="expand"
                  id={`submission-startingDate-${season.startingDate}`}
                >{`From: ${startingDate} to: ${endingDate}`}</Subtitle>
                <Title>Projects submitted to this Season:</Title>
                <Button level={2} onClick={() => push('/admin/projects')}>
                  Submit a project
                </Button>
                <SubmissionsWrapper>
                  <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
                </SubmissionsWrapper>
              </Wrapper>
            )
          })}
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
  margin: 50px 200px;
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: 2fr 1fr;
  .expand {
    grid-column: 1 / 3;
  }
`

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
  color: ${rgba(palette.night)};
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${rgba(palette.night)};
`
