import { assertFloat } from '@lib'

const BASE_ARTIFACT_PRICE = assertFloat(process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE, 'NEXT_PUBLIC_BASE_ARTIFACT_PRICE')

const getMatchFundMoney = (totalSales: number, countH: number, spli80: number): number => {
  const split = totalSales > 0 ? (countH * 100) / totalSales : 0
  console.log('this project split is: ', split)
  //split: 6*100/8 = 75%
  //spli80: 80*10/100 = 8
  return (spli80 * split) / 100
}

export const calculateSales = (isWinner: boolean, matchFundPooled: number, count: number, totalSales: number) => {
  const salesArtifacts = BASE_ARTIFACT_PRICE * count

  const spli80 = (80 * matchFundPooled) / 100
  const split20 = (20 * matchFundPooled) / 100
  const projectMatchFund = getMatchFundMoney(totalSales, count, spli80) + salesArtifacts

  const totalAward = (salesArtifacts + projectMatchFund + (isWinner ? split20 : 0)).toFixed(2)

  return {
    salesArtifacts,
    projectMatchFund: projectMatchFund.toFixed(2),
    spli80: spli80.toFixed(2),
    prize: split20.toFixed(2),
    totalAward,
    calculateMatchFundContribution: (newCount: any) => {
      return getMatchFundMoney(totalSales, newCount, spli80).toFixed(2)
    },
  }
}
