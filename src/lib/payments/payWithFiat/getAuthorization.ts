const getAuthorization = async (orderID: string) => {
  const authorizationResponse = await fetch(`/api/onramp/authorization?orderId=${orderID}`)
  if (!authorizationResponse) throw 'Error retrieving order'

  const authorization = await authorizationResponse.json()
  if (!authorization) throw 'Error interpreting authorization data'

  return authorization
}

export default getAuthorization
