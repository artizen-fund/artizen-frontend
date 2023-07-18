import { useContext, useState } from 'react'
import { ISubscribeSeasonsSubscription, ISubmissionFragment, ISeasonFragment, ISubmissions } from '@types'
import { useSubscription } from '@apollo/client'
import { SeasonContext, useDateHelpers } from '@lib'
import { SUBSCRIBE_SEASONS } from '@gql'

const arrangeSubmissions = (submissions: ISubmissionFragment[]) =>
  submissions.sort((s1: ISubmissionFragment, s2: ISubmissionFragment) => {
    return (
      s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
      s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
    )
  })

const countTotalSales = (submissions: ISubmissionFragment[]): number => {
  let total = 0

  submissions.forEach(submission => {
    total += submission.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
  })

  return total
}

export function useSeasonSubscriptionData() {
  const { seasonId, isSeasonActive: seasonIsActive } = useContext(SeasonContext)
  const [arrangedSeasonList, setArrangedSeasonList] = useState<ISubmissionFragment[] | null>(null)
  const [totalSales, setTotalSales] = useState<number>(0)
  // const { isSeasonActive } = useDateHelpers()

  const { data, loading } = useSubscription<ISubscribeSeasonsSubscription>(SUBSCRIBE_SEASONS, {
    skip: !seasonId,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: { _eq: seasonId },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
    onData: ({ data: { data, loading, error } }) => {
      console.log('Seasons from subscription onData::::: ', data)
      if (!loading && !error && data?.Seasons[0]) {
        const arrangedSeasonList = arrangeSubmissions(data?.Seasons[0].submissions)
        const totalSales = countTotalSales(data?.Seasons[0].submissions)
        setArrangedSeasonList(arrangedSeasonList.splice(0, 2))
        setTotalSales(totalSales)
      }
      console.log('Seasons from subscription ', data)
    },
  })

  console.log('data from subscription::::: ', data)

  // const seasonIsActive = isSeasonActive(data?.Seasons[0]?.startingDate, data?.Seasons[0]?.endingDate)

  return { arrangedSeasonList, totalSales, season: data?.Seasons[0], loading, seasonIsActive }
}
