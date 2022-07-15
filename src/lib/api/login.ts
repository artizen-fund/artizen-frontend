import type { MagicUserMetadata } from 'magic-sdk'

const login = async (didToken: string): Promise<TokenAndMetadataBundle> =>
  await fetch('/api/createSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  })
    .then(async data => {
      return await data.json()
    })
    .catch(e => {
      throw new Error(e)
    })

export default login
