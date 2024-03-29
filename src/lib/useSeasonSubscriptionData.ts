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

function getBaseLog(x: number, y: number) {
  return Math.log(x) / Math.log(y)
}

const getBaseAllSales = (submissions: ISubmissionFragment[]): number => {
  let baseTotal = 0
  const BaseLog = 1.0001

  submissions.forEach(submission => {
    // total += submission.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
    const filteredOpenEditionCopiesTotal = filteredOpenEditionCopies(submission.project!.artifacts[0].openEditionCopies)

    console.log('filteredOpenEditionCopiesTotal    ', filteredOpenEditionCopiesTotal)

    const submissionsCount = count(filteredOpenEditionCopiesTotal)
    console.log('submissionsCount    ', submissionsCount + 1)

    const LogB2 = submissionsCount > 0 ? getBaseLog(submissionsCount + 1, BaseLog) : 0

    console.log('LogB2    ', LogB2)
    baseTotal += LogB2
  })

  console.log('getBaseAllSales  baseTotal:::  ', baseTotal)

  return baseTotal
}

export function useSeasonSubscriptionData() {
  const { seasonId, isSeasonActive: seasonIsActive } = useContext(SeasonContext)
  const [arrangedSeasonList, setArrangedSeasonList] = useState<ISubmissionFragment[] | null>(null)
  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalPrizePooled, setTotalPrizePooled] = useState<number>(0)
  const [totalBase, setTotalBase] = useState<number>(0)

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
      if (!loading && !error && data?.Seasons[0]) {
        const arrangedSeasonListHere = arrangeSubmissions(data?.Seasons[0].submissions)
        const totalSales = countTotalSales(data?.Seasons[0].submissions)

        //getBaseAllSales

        setTotalBase(getBaseAllSales(data?.Seasons[0].submissions))

        setArrangedSeasonList(arrangedSeasonListHere)
        setTotalSales(totalSales)
        const totalPrizePooledL = data?.Seasons[0].matchFundPooled + totalSales * BASE_ARTIFACT_PRICE
        setTotalPrizePooled(totalPrizePooledL ? totalPrizePooledL.toFixed(2) : 0)
      }
    },
  })

  return {
    arrangedSeasonList,
    totalSales,
    totalBase,
    season: data?.Seasons[0],
    loading,
    seasonIsActive,
    totalPrizePooled,
  }
}
