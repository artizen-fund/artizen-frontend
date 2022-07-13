import type { MagicUserMetadata } from 'magic-sdk'

type TokenAndMetadataBundle = {
  token: string
  metadata: MagicUserMetadata
}

const fetchTokenAndMetadata = async (didToken: string): Promise<TokenAndMetadataBundle> =>
  await fetch('/api/tokenAndMetadata', {
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

export default fetchTokenAndMetadata
