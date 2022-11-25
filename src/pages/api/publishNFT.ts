import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { storeNFTFromContent, storeNFTFromFile } from '@lib'

const publishNFT = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imagePath, name, description, metadata } = req.body
    if (metadata) {
      await storeNFTFromContent(metadata, name, description)
    } else if (imagePath) {
      await storeNFTFromFile(imagePath, name, description)
    }

    throw new Error('Missing imagePath or metadata!')
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default withSentry(publishNFT)
