import { MoralisNextApi } from '@moralisweb3/next'
import { assert } from '@lib'

const NEXTAUTH_URL = assert(process.env.NEXTAUTH_URL, 'NEXTAUTH_URL')

//TODO: get rid of NEXT_PUBLIC_APP_DOMAIN

export default MoralisNextApi({
  apiKey: assert(process.env.MORALIS_API_KEY, 'MORALIS_API_KEY'),
  authentication: {
    domain: new URL(NEXTAUTH_URL).host,
    uri: NEXTAUTH_URL,
    timeout: 120,
  },
})
