import { withSentry } from '@sentry/nextjs'
import Moralis from 'moralis-v1/node'
import { NextApiRequest, NextApiResponse } from 'next'

const getDonations = async (req: NextApiRequest, res: NextApiResponse) => {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({
    serverUrl: process.env.MORALIS_SERVER_URL,
    appId: process.env.MORALIS_API_KEY,
    masterKey: process.env.MORALIS_MASTER_KEY,
  })

  const Donation = Moralis.Object.extend('Donation')

  const query = new Moralis.Query(Donation)
  query.descending('block_number')
  const results = await query.find()

  res.status(200).json(results)
}

export default withSentry(getDonations)
