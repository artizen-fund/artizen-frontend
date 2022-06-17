import { Magic } from '@magic-sdk/admin'
import { assert } from '@lib'

// initiating Magic instance for server-side methods
export const magicLinkAdmin = new Magic(
  assert(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY, 'NEXT_PUBLIC_MAGIC_SECRET_KEY'),
)
