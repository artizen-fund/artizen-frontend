import { createContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_SEASON_FOR_TIME } from '@gql'
import { ISeasonForTimeQuery } from '@types'
import { useDateHelpers } from '@lib'

/* 

# Current Season Context

## Why do we need this?

We're using Apollo subscriptions to keep an eye on the current season. 
A subscription works something like this…
```
// pseudocode
const { data } = useSubscription(SOME_GRAPHQL_QUERY, {
  where: {
    startingDate: { gt: now },
    endingDate: { lte: now }
  }
})
```

The catch is, the variable "now" is a key, and when that changes, a new subscription is made.
Thus, if you have a key based on a time, a new subscription is created AT EVERY SECOND.

## So what do we do?

We need to keep the timestamp (our key) as a global var, and only update it when necessary.

"so set an interval and update the global once a minute?" 
Nope, those queries are still kind of expensive, and could cause React refresh cascades once a minute.

The most efficient thing to do (AFAIK) is…
1. cache a timestamp upon site load
2. use a normal query to look for an existing season ID and endDate
3. use the season ID for the subscription
4. use an interval to see if the timestamp has stepped over the endDate
5. refresh the timestamp; updates cascade.
*/

interface ISeasonContext {
  seasonId?: string
  loadingSeasonId?: boolean
  seasonIndex?: number
}

export const SeasonContext = createContext<ISeasonContext>({})

export const SeasonContextProvider = ({ children }: SimpleComponentProps) => {
  const { getNowWithFormat } = useDateHelpers()
  const [localTimestamp, setLocalTimestamp] = useState<string>()
  const [seasonId, setSeasonId] = useState<string>() // current or next season
  const [seasonIndex, setSeasonIndex] = useState<number>() // current or next season

  // 1. cache a timestamp upon site load
  useEffect(() => {
    setLocalTimestamp(getNowWithFormat())
  }, [])

  // 2. use a normal query to look for an existing season ID and endDate
  // This query looks for the next ending date in-the-future;
  // if startingDate <= localTimestamp, it is the current season.
  // if staringDate > localTimestamp, it's the next season.
  const { loading, data, error } = useQuery<ISeasonForTimeQuery>(GET_SEASON_FOR_TIME, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        endingDate: { _lt: localTimestamp },
      },
      order_by: { startingDate: 'desc' },
    },
  })

  if (error) {
    console.error('error retrieving season', error)
  }

  console.log('data  ISeasonForTimeQuery ', data)

  // 3. use the season ID for the subscription
  useEffect(() => {
    let checkAgainIfNotFound: NodeJS.Timeout
    console.log('data', data)
    if (!data || !data.Seasons[0] || loading) {
      checkAgainIfNotFound = setTimeout(() => {
        refreshTimestamp()
      }, 1000 * 60)
      return
    }
    setSeasonId(data.Seasons[0]?.id)
    setSeasonIndex(data.Seasons[0]?.index)
    return () => {
      clearTimeout(checkAgainIfNotFound)
    }
  }, [data])

  // 4. use an interval to see if the timestamp has stepped over the endDate, then…
  useEffect(() => {
    const checkTimetampEverySecond = setInterval(refreshTimestamp, 1000)
    return () => {
      clearInterval(checkTimetampEverySecond)
    }
  }, [])

  const refreshTimestamp = () => {
    if (!data || !data.Seasons[0]) return
    setLocalTimestamp(getNowWithFormat())
  }

  return (
    <SeasonContext.Provider
      value={{
        seasonId,
        seasonIndex,
        loadingSeasonId: loading,
      }}
    >
      {children}
    </SeasonContext.Provider>
  )
}
