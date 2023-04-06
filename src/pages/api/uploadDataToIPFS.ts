import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { storeNFTFromContent, storeNFTFromUrl } from '@lib'

const uploadDataToIPFS = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('req.body  ', req.body)

  try {
    const { imagePath, name, metadata } = req.body

    console.log('imagePath  ', imagePath)
    console.log('metadata  ', metadata)

    if (metadata) {
      const result = await storeNFTFromContent(metadata, name)
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

export default withSentry(uploadDataToIPFS)
