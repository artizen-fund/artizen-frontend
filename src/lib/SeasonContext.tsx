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
  currentSeasonId?: string
}

export const SeasonContext = createContext<ISeasonContext>({})

export const SeasonContextProvider = ({ children }: SimpleComponentProps) => {
  const { getNowWithFormat, isSeasonActive } = useDateHelpers()
  const [localTimestamp, setLocalTimestamp] = useState<string>()
  const [currentSeasonId, setCurrentSeasonId] = useState<string>()

  // 1. cache a timestamp upon site load
  useEffect(() => {
    setLocalTimestamp(getNowWithFormat())
  }, [])

  // 2. use a normal query to look for an existing season ID and endDate
  const { loading, data, error } = useQuery<ISeasonForTimeQuery>(GET_SEASON_FOR_TIME, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        startingDate: { _lte: localTimestamp },
        endingDate: { _gt: localTimestamp },
      },
    },
  })

  if (error) {
    console.error('error retrieving current season', error)
  }

  // 3. use the season ID for the subscription
  useEffect(() => {
    let checkAgainIfNotFound: NodeJS.Timeout
    if (!data || !data.Seasons[0] || loading) {
      checkAgainIfNotFound = setTimeout(() => {
        refreshTimestamp()
      }, 1000 * 60)
      return
    }
    setCurrentSeasonId(data.Seasons[0]?.id)
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

    if (isSeasonActive(data.Seasons[0]?.startingDate, data.Seasons[0]?.endingDate)) {
      // 5. refresh the timestamp; updates cascade.
      setLocalTimestamp(getNowWithFormat())
    }
  }

  return (
    <SeasonContext.Provider
      value={{
        currentSeasonId,
      }}
    >
      {children}
    </SeasonContext.Provider>
  )
}