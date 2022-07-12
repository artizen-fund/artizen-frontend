const loginUser = async (magicToken: string): Promise<any> =>
  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${magicToken}`,
    },
  })
    .then(async data => {
      return await data.json()
    })
    .catch(e => {
      throw new Error(e)
    })

export default loginUser
