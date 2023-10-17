import { useContext, useState } from 'react'
import { ISubscribeSeasonsSubscription, ISubmissionFragment, ISeasonFragment, ISubmissions } from '@types'
import { useSubscription } from '@apollo/client'
import { SeasonContext, assertFloat } from '@lib'
import { SUBSCRIBE_SEASONS } from '@gql'

const BASE_ARTIFACT_PRICE = assertFloat(process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE, 'NEXT_PUBLIC_BASE_ARTIFACT_PRICE')

const filteredOpenEditionCopies = (openEditionsArray: any) =>
  openEditionsArray.filter(({ status }: any) => status === 'confirmed') || []

const count = (arrayOfOpenEdtionClean: any) =>
  arrayOfOpenEdtionClean.reduce((x: any, edition: any) => x + edition.copies!, 0) || 0

const arrangeSubmissions = (submissions: ISubmissionFragment[]) =>
  submissions.sort((s1: ISubmissionFragment, s2: ISubmissionFragment) => {
    const project1ValidCopies = filteredOpenEditionCopies(s1.project!.artifacts[0].openEditionCopies)
    const project1Count = count(project1ValidCopies)

    const project2ValidCopies = filteredOpenEditionCopies(s2.project!.artifacts[0].openEditionCopies)
    const project2Count = count(project2ValidCopies)

    return project2Count - project1Count

    // return (
    //   s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
    //   s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
    // )
  })

const countTotalSales = (submissions: ISubmissionFragment[]): number => {
  let total = 0

  submissions.forEach(submission => {
    // total += submission.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
    const filteredOpenEditionCopiesTotal = filteredOpenEditionCopies(submission.project!.artifacts[0].openEditionCopies)
    total += count(filteredOpenEditionCopiesTotal)
  })

  return total
}

export function useSeasonSubscriptionData() {
  const { seasonId, isSeasonActive: seasonIsActive } = useContext(SeasonContext)
  const [arrangedSeasonList, setArrangedSeasonList] = useState<ISubmissionFragment[] | null>(null)
  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalPrizePooled, setTotalPrizePooled] = useState<number>(0)
  // const { isSeasonActive } = useDateHelpers()

  console.log('seasonId  ', seasonId)

  const { data, loading, error } = useSubscription<ISubscribeSeasonsSubscription>(SUBSCRIBE_SEASONS, {
    skip: !seasonId,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: { _eq: seasonId },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
    onData: ({ data: { data, loading, error } }) => {
      console.log('useSubscription data in ondata', data)
      console.log('useSubscription loading in ondata', loading)
      console.log('useSubscription error in ondata', error)
      if (!loading && !error && data?.Seasons[0]) {
        const arrangedSeasonListHere = arrangeSubmissions(data?.Seasons[0].submissions)
        const totalSales = countTotalSales(data?.Seasons[0].submissions)
        console.log('totalSales of open edition calls', totalSales)
        setArrangedSeasonList(arrangedSeasonListHere)
        setTotalSales(totalSales)
        setTotalPrizePooled(data?.Seasons[0].matchFundPooled + totalSales * BASE_ARTIFACT_PRICE * 2)
      }
    },
  })

  console.log('error in useSeasonSubscriptionData', error)

  // const seasonIsActive = isSeasonActive(data?.Seasons[0]?.startingDate, data?.Seasons[0]?.endingDate)

  return { arrangedSeasonList, totalSales, season: data?.Seasons[0], loading, seasonIsActive, totalPrizePooled }
}
