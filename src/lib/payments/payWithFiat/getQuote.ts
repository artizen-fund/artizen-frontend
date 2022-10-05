export const getQuote = async (amount: number, walletAddress: string, country: string) => {
  const quoteResponse = await fetch('/api/onramp/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      walletAddress,
      country,
    }),
  })
  if (!quoteResponse) throw 'Error retrieving quote'

  const quote = await quoteResponse.json()
  if (!quote) throw 'Error interpreting quote data'

  return quote
}

export default getQuote
