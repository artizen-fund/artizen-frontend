import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from '@lib'

const quoteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SENDWYRE_SECRET = assert(process.env.SENDWYRE_SECRET, 'SENDWYRE_SECRET')
  const SENDWYRE_ACCOUNT = assert(process.env.SENDWYRE_ACCOUNT, 'SENDWYRE_ACCOUNT')
  const sdk = api('@wyre-hub/v4#fyktdr28l3w9dqt1')
  sdk.auth(SENDWYRE_SECRET)
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  const { amount, walletAddress, country } = req.body
  try {
    const quote = await sdk.CreateWalletOrderQuotation({
      walletType: 'DEBIT_CARD',
      amount,
      sourceCurrency: 'USD',
      destCurrency: 'MUSDC',
      dest: `matic:${walletAddress}`,
      accountId: SENDWYRE_ACCOUNT,
      country,
    })
    res.status(200).json(quote)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export default quoteHandler
