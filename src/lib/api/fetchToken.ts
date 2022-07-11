const fetchToken = async (token: string): Promise<UserToken> =>
  await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async data => {
      return await data.json()
    })
    .catch(e => {
      throw new Error(e)
    })

export default fetchToken
