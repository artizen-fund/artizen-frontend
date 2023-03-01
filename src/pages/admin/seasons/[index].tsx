import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions } from '@components'
import { palette } from '@theme'

export default function SeasonPage(): JSX.Element {
  const {
    query: { index },
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

  console.log('loadedSeasonsData', loadedSeasonsData)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          {loadedSeasonsData?.Seasons.map((season: ISeasonFragment) => {
            console.log('season', season.submissions)
            const id = `submission-container-id-${season.id}`
            return (
              <Wrapper key={id} id={id}>
                <Title id={`submission-title-${season.title}`}>{season.title}</Title>
                <Title id={`submission-startingDate-${season.startingDate}`}>{season.startingDate}</Title>
                <Title id={`submission-endingDate-${season.endingDate}`}>{season.endingDate}</Title>
                <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
              </Wrapper>
            )
          })}
        </Layout>
      )}
    </>
  )
}

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${palette.night};
  color: ${palette.moon};

  @media (prefers-color-scheme: dark) {
    background-color: ${palette.moon};
    color: ${palette.night};
  }
`
