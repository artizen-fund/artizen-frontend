import { reduceWithPrecision } from '@lib'

/*
  A User might donate multiple times. 
  We need to represent them only once on the Leaderboard, with their sum of donations.
  We also use this calculation on the Grant View page to find the winner.
*/

interface UserWithDonations {
  donations: Array<{
    amount: number
  }>
}

const aggregateDonators = <T extends UserWithDonations>(donatingUsers: Array<T>) =>
  donatingUsers
    .map(u => {
      const aggregateDonation = reduceWithPrecision(u.donations.map(d => d.amount))((a: number, b: number) => a + b)
      return { ...u, aggregateDonation }
    })
    .sort((a, b) => (a.aggregateDonation > b.aggregateDonation ? -1 : 1))

export { aggregateDonators }
