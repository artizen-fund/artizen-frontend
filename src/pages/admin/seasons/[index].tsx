// functional component that takes in a router query of type NextRouter
// use the useQuery hook to query the database for the seasons
// user data from the query to display the seasons
// and returns a JSX element
// display the title of the season
// display the starting date of the season
// display the ending date of the season
// display the number of submission in the season

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery, ISeasonFragment } from '@types'
import { Spinner, Layout } from '@components'

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
            return (
              <>
                <h1>{season.title}</h1>
                <h2>{season.startingDate}</h2>
                <h2>{season.endingDate}</h2>
                <h2>{season.submissions[0].id}</h2>
              </>
            )
          })}
        </Layout>
      )}
    </>
  )
}
