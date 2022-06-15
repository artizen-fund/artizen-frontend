import { Magic } from '@magic-sdk/admin'
import { assert } from '@lib'

// initiating Magic instance for server-side methods
export const magic = new Magic(assert(process.env.MAGIC_SECRET_KEY))

