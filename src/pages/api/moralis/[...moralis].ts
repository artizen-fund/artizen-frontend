import { MoralisNextApi } from '@moralisweb3/next'
import { assert } from '@lib'

export default MoralisNextApi({
  apiKey: assert(process.env.MORALIS_API_KEY, 'MORALIS_API_KEY'),
  authentication: {
    domain: assert(process.env.NEXT_PUBLIC_APP_DOMAIN, 'NEXT_PUBLIC_APP_DOMAIN'),
    uri: assert(process.env.NEXTAUTH_URL, 'NEXTAUTH_URL'),
    timeout: 120,
  },
})
