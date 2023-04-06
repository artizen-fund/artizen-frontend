import { assert } from '@lib'

import pinataSDK from '@pinata/sdk'

/**
 * Reads an image file from `imageUrl` and stores an NFT with the given name.
 * @param {string} imageUrl the url to an image file
 * @param {string} name a name for the NFT
 */
export async function storeNFTFromUrl(imageUrl: string, name: string) {
  const pinataJWTKey = assert(assert(process.env.PINATA_JWT_KEY, 'PINATA_JWT_KEY'))
  const pinata = new pinataSDK({
    pinataJWTKey,
  })

  const options = {
    pinataMetadata: {
      name,
    },
  }

  const response = await fetch(imageUrl)
  const result = await pinata.pinFileToIPFS(response.body, options)

  return result
}

/**
 * Stores a metadata of an NFT with the given name.
 * @param {any} metadata the medatada
 * @param {string} name a name for the NFT
 */
export async function storeNFTFromContent(metadata: any, name: string) {
  const pinataJWTKey = assert(assert(process.env.PINATA_JWT_KEY, 'PINATA_JWT_KEY'))
  const pinata = new pinataSDK({
    pinataJWTKey,
  })

  const options = {
    pinataMetadata: {
      name,
    },
  }

  console.log('metadata  storeNFTFromContent  ', metadata)

  const result = await pinata.pinJSONToIPFS(metadata, options)

  return result
}
