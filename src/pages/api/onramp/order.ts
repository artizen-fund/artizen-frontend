import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  const {
    amount,
    walletAddress,
    address,
    reservationId,
    givenName,
    familyName,
    email,
    phone,
    referenceId,
    ipAddress,
    paymentMethodToken,
  } = req.body

  const body = {
    delivery: {
      payment_method_token: paymentMethodToken,
      url: `${process.env.NEXT_PUBLIC_SENDRYRE_BASE_URL}/v3/debitcard/process/partner`,
      headers: `Content-Type: application/json\r\nAuthorization: Bearer ${process.env.SENDWYRE_SECRET}`,
      body: JSON.stringify({
        debitCard: {
          number: '{{credit_card_number}}',
          year: '{{credit_card_year}}',
          month: '{{credit_card_month}}',
          cvv: '{{credit_card_verification_value}}',
        },
        address,
        reservationId,
        amount,
        sourceCurrency: 'USD',
        destCurrency: 'MUSDC',
        dest: `matic:${walletAddress}`,
        referrerAccountId: process.env.SENDWYRE_ACCOUNT,
        givenName,
        familyName,
        email,
        phone,
        referenceId,
        ipAddress,
        trigger3ds: true,
      }),
    },
  }

  const credentials = btoa(`${process.env.NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY}:${process.env.SPREEDLY_ACCESS_KEY}`)

  try {
    const orderResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SPREEDLY_BASE_URL}/receivers/${process.env.SPREEDLY_RECEIVER_TOKEN}/deliver.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(body),
      },
    )

    const {
      transaction: {
        response: { body: order },
      },
    } = await orderResponse.json()

    res.status(200).json(JSON.parse(order))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
