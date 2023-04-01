import { IOpenEditionsSubscription } from '@types'
import { uniqBy } from 'lodash'

/*
  A User might donate multiple times. 
  We need to represent them only once on the Leaderboard, with their sum of donations.
  We also use this calculation on the Grant View page to find the winner.
*/

interface UserOnLeaderboard {
  __typename?: string
  firstName?: string
  lastName?: string
  artizenHandle?: string
  profileImage?: string
  copies: number
}

const aggregateDonators = (data: IOpenEditionsSubscription): Array<UserOnLeaderboard> => {
  const users = uniqBy(data.OpenEditionCopies, openEdition => openEdition.user.id).map(openEdition => openEdition.user)

  if (!users) return []

  return users
    .map(user => ({
      ...user,
      copies: data.OpenEditionCopies.filter(item => item.user.id === user.id)
        .map(item => item.copies || 0)
        .reduce((x, y) => x + y, 0),
    }))
    .sort((a, b) => (a.copies > b.copies ? -1 : 1))
}

export { aggregateDonators }
