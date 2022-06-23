const fetchUser = async (): Promise<ArtizenUser> =>
  await fetch('/api/user')
    .then(async data => {
      return await data.json()
    })
    .catch(e => {
      throw new Error(e)
    })

export default fetchUser
