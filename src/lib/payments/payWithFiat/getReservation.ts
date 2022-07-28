const getReservation = async (amount: number, walletAddress: string) => {
  const reservationResponse = await fetch('/api/onramp/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      walletAddress,
    }),
  })
  if (!reservationResponse) throw 'Error retrieving reservation'

  const reservation = await reservationResponse.json()
  if (!reservation) throw 'Error interpreting reservation data'

  return reservation
}

export default getReservation
