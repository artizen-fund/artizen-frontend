import { makeVar } from '@apollo/client'

export const userMetadataVar = makeVar<UserBundle | undefined>(undefined)
