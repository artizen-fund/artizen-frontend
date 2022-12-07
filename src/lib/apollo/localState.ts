import { makeVar } from '@apollo/client'
import { IUsers } from '@types'

export const loggedInUserVar = makeVar<Partial<IUsers> | undefined>(undefined)
