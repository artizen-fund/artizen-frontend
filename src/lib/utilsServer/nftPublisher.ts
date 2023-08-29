import { assert } from '@lib'
import pinataSDK from '@pinata/sdk'
import axiosRetry from 'axios-retry'
import { Readable } from 'stream'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
/**
 * Reads an image file from `imageUrl` and stores an NFT with the given name.
 * @param {string} imageUrl the url to an image file
 * @param {string} name a name for the NFT
 */
export async function storeNFTFromUrl(imageUrl: string, name: string) {
  const formData = new FormData()
  const axiosInstance = axios.create()

  axiosRetry(axiosInstance, { retries: 5 })

  const pinataJWTKey = assert(assert(process.env.PINATA_JWT_KEY, 'PINATA_JWT_KEY'))

  const response = await axiosInstance(imageUrl, {
    method: 'GET',
    responseType: 'stream',
  })
  formData.append(`file`, response.data)

  formData.append('pinataMetadata', JSON.stringify({ name }))

  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS ', formData, {
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
    headers: {
      Authorization: `Bearer ${pinataJWTKey}`,
    },
  })

  return res.data
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

  const result = await pinata.pinJSONToIPFS(metadata, options)

  return result
}
