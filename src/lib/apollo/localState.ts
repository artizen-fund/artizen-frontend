import { makeVar } from '@apollo/client'
import type { MagicUserMetadata } from 'magic-sdk'

export const userMetadataVar = makeVar<MagicUserMetadata | undefined>(undefined)
