import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { storeNFTFromContent, storeNFTFromUrl } from '@lib'

const publishNFT = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imagePath, name, metadata } = req.body
    if (metadata) {
      const result = storeNFTFromContent(metadata, name)
      return res.json(result)
    } else if (imagePath) {
      const result = await storeNFTFromUrl(imagePath, name)
      return res.json(result)
    }

    throw new Error('Missing imagePath or metadata!')
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default withSentry(publishNFT)
