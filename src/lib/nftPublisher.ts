// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'

// The 'fs' builtin module on Node.js provides access to the file system
import fs from 'fs'

// The 'path' module provides helpers for manipulating filesystem paths
import path from 'path'

import { assert } from '@lib'

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = assert(process.env.NFT_STORAGE_KEY, 'NFT_STORAGE_KEY')

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeNFTFromFile(imagePath: string, name: string, description: string) {
  // load the file from disk
  const image = await fileFromPath(imagePath)

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description,
  })
}

/**
 * Stores an NFT content with the given name and description.
 * @param {string} content the content of the file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeNFTFromContent(image: string, name: string, description: string) {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

  const str = JSON.stringify(image)
  const bytes = new TextEncoder().encode(str)
  const blob = new Blob([bytes], {
    type: 'application/json;charset=utf-8',
  })

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image: blob,
    name,
    description,
  })
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath: string) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath) || ''
  return new File([content], path.basename(filePath), { type })
}
