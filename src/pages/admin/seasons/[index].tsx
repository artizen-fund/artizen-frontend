import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout, Submissions } from '@components'
import { palette } from '@theme'
import dayjs from 'dayjs'

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
                <Subtitle id={`submission-status-${season.title}`}>{'running'}</Subtitle>
                <Subtitle
                  id={`submission-startingDate-${season.startingDate}`}
                >{`From: ${startingDate} to: ${endingDate}`}</Subtitle>

                <Submissions submissions={season.submissions.length > 0 ? season.submissions : []} />
              </Wrapper>
            )
          })}
        </Layout>
      )}
    </>
  )
}

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`

const Wrapper = styled.div`
  margin: 50px 200px;
  display: grid;
  grid-template-rows: 50px 150px;
  grid-template-columns: 2fr 1fr;
`
