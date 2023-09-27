import type { NextApiRequest, NextApiResponse } from 'next'
import { storeNFTFromContent, storeNFTFromUrl } from '@lib'

const uploadDataToIPFS = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imagePath, name, metadata } = req.body

    if (metadata) {
      const result = await storeNFTFromContent(metadata, name)
      return res.json(result)
    } else if (imagePath) {
      const result = await storeNFTFromUrl(imagePath, name)

      return res.json(result)
    }

    throw new Error('Missing imagePath or metadata!')
  } catch (error) {
    console.error('error  uploadDataToIPFS  ', error)
    res.status(500).end()
  }
}

export default uploadDataToIPFS
