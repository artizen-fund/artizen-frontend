const fetchToken = async (didToken: string): Promise<UserToken> =>
  await fetch('/api/token', {
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

export default fetchToken
