import { assertFloat } from '@lib'

const BASE_ARTIFACT_PRICE = assertFloat(process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE, 'NEXT_PUBLIC_BASE_ARTIFACT_PRICE')

const getMatchFundMoney = (totalSales: number, countH: number, spli80: number): number => {
  const split = totalSales > 0 ? (countH * 100) / totalSales : 0

  //split: 6*100/8 = 75%
  //spli80: 80*10/100 = 8
  return (spli80 * split) / 100
}

export const calculateSales = (isWinner: boolean, matchFundPooled: number, count: number, totalSales: number) => {
  const getSalesArtifacts = (artifactCount: number) => BASE_ARTIFACT_PRICE * artifactCount

  const totalProjectSales = getSalesArtifacts(count)

  const spli90 = (90 * matchFundPooled) / 100
  const split10 = (10 * matchFundPooled) / 100
  const projectMatchFund = getMatchFundMoney(totalSales, count, spli90)

  const totalAward = (totalProjectSales + projectMatchFund + (isWinner ? split10 : 0)).toFixed(2)

  return {
    salesArtifacts: totalProjectSales,
    projectMatchFund: projectMatchFund.toFixed(2),
    spli80: spli90.toFixed(2),
    prize: split10.toFixed(2),
    totalAward,
    calculateMatchFundContribution: (newCount: any) => {
      return getMatchFundMoney(totalSales, newCount, spli90).toFixed(2)
      // return (getSalesArtifacts(newCount) + getMatchFundMoney(totalSales, newCount, spli90)).toFixed(2)
    },
  }
}
