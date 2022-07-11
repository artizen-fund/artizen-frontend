import { makeVar } from '@apollo/client'
import type { MagicUserMetadata } from 'magic-sdk'

export const userMetadata = makeVar<MagicUserMetadata | undefined>(undefined)
