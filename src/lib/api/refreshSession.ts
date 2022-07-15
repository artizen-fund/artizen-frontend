const refreshSession = async (): Promise<TokenAndMetadataBundle> =>
  await fetch('/api/refreshSession')
    .then(async data => {
      return await data.json()
    })
    .catch(e => {
      throw new Error(e)
    })

export default refreshSession
