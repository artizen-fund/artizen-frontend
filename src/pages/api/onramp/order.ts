import { assert } from '@lib'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
  const wyreBaseUrl = assert(process.env.NEXT_PUBLIC_SENDWYRE_BASE_URL, 'NEXT_PUBLIC_SENDWYRE_BASE_URL')
  const secret = assert(process.env.SENDWYRE_SECRET, 'SENDWYRE_SECRET')
  const spreedlyBaseUrl = assert(process.env.NEXT_PUBLIC_SPREEDLY_BASE_URL, 'NEXT_PUBLIC_SPREEDLY_BASE_URL')
  const spreedlyReceiverToken = assert(process.env.SPREEDLY_RECEIVER_TOKEN, 'SPREEDLY_RECEIVER_TOKEN')
  const spreedlyEnvironmentKey = assert(
    process.env.NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY,
    'NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY',
  )
  const spreedlyAccessKey = assert(process.env.SPREEDLY_ACCESS_KEY, 'SPREEDLY_ACCESS_KEY')
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
      url: `${wyreBaseUrl}/v3/debitcard/process/partner`,
      headers: `Content-Type: application/json\r\nAuthorization: Bearer ${secret}`,
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

  const credentials = btoa(`${spreedlyEnvironmentKey}:${spreedlyAccessKey}`)

  try {
    const orderResponse = await fetch(`${spreedlyBaseUrl}/receivers/${spreedlyReceiverToken}/deliver.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    })

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
