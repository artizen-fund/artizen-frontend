import { getUsersByPublicAddress } from '@lib'
import { withSentry } from '@sentry/nextjs'
import Moralis from 'moralis-v1/node'
import { NextApiRequest, NextApiResponse } from 'next'

const getDonations = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.cookies.token) {
    throw new Error('missing token')
  }

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

  const listOfAddresses = results.map(item => item.get('from'))

  let donations = []
  if (req.cookies.token) {
    const users = (await getUsersByPublicAddress(listOfAddresses, req?.cookies?.token)).data.User
    for (let i = 0; i < results.length; i++) {
      const user = users.find(item => item.publicAddress === results[i].get('from'))
      donations.push({ ...results[i].toJSON(), user })
    }
  } else {
    donations = results
  }

  res.setHeader('Cache-Control', 's-maxage=60')
  res.status(200).json(donations)
}

export default withSentry(getDonations)
