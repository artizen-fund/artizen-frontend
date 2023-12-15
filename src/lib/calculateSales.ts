import { assertFloat } from '@lib'

const BASE_ARTIFACT_PRICE = assertFloat(process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE, 'NEXT_PUBLIC_BASE_ARTIFACT_PRICE')

const getMatchFundMoney = (totalSales: number, countH: number, spli80: number): number => {
  const split = totalSales > 0 ? (countH * 100) / totalSales : 0

  //split: 6*100/8 = 75%
  //spli80: 80*10/100 = 8
  return (spli80 * split) / 100
}

function getBaseLog(x: number, y: number) {
  return Math.log(x) / Math.log(y)
}

const getMatchFundMoneyAlgor = (totalSales: number, countH: number, spli90: number, totalBase: number): number => {
  // const split = totalSales > 0 ? (countH * 100) / totalSales : 0

  // //split: 6*100/8 = 75%
  // //spli80: 80*10/100 = 8
  // return (spli80 * getBaseLog(2,split)) / 100

  console.log('totalBase    ', totalBase)

  const BaseLog = 1.0001

  console.log('countH    ', countH)

  const LogB2 = getBaseLog(countH + 1, BaseLog)

  console.log('LogB2    ', LogB2)

  const projectBasedPercent = (LogB2 * 100) / totalBase

  console.log('getPercent    ', projectBasedPercent)

  const getCOntribution = (spli90 * projectBasedPercent) / 100

  console.log('getCOntribution    ', getCOntribution)

  return getCOntribution
}

export const calculateSales = (
  isWinner: boolean,
  matchFundPooled: number,
  count: number,
  totalSales: number,
  totalBase: number,
) => {
  const getSalesArtifacts = (artifactCount: number) => BASE_ARTIFACT_PRICE * artifactCount

  const totalProjectSales = getSalesArtifacts(count)

  const spli90 = (90 * matchFundPooled) / 100
  const split10 = (10 * matchFundPooled) / 100
  //const projectMatchFund = getMatchFundMoney(totalSales, count, spli90)

  console.log('calculateSales totalBase    ', totalBase)

  const projectMatchFund = getMatchFundMoneyAlgor(totalSales, count, spli90, totalBase)

  const totalAward = (totalProjectSales + projectMatchFund + (isWinner ? split10 : 0)).toFixed(2)

  return {
    salesArtifacts: totalProjectSales,
    projectMatchFund: projectMatchFund.toFixed(2),
    spli80: spli90.toFixed(2),
    prize: split10.toFixed(2),
    totalAward,
    getSalesArtifacts: (newCount: any) => getSalesArtifacts(newCount).toFixed(2),
    calculateMatchFundContribution: (newCount: any) => {
      return getMatchFundMoney(totalSales, newCount, spli90).toFixed(2)
      // return (getSalesArtifacts(newCount) + getMatchFundMoney(totalSales, newCount, spli90)).toFixed(2)
    },
  }
}
