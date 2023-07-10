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

  // const options = {
  //   pinataMetadata: {
  //     name,
  //   },
  // }

  const response = await axiosInstance(imageUrl, {
    method: 'GET',
    responseType: 'stream',
  })
  formData.append(`file`, response.data)

  formData.append('pinataMetadata', JSON.stringify({ name: 'test' }))

  // const response = await fetch(imageUrl)

  // console.log('response', response)

  // const data = await response.json()

  // console.log('data:::', data)

  // const response = await axios.get<Readable>(imageUrl, {
  //   responseType: 'stream',
  // })

  // // console.log('data in here ', data)

  // const result = await pinata.pinFileToIPFS(response, options)

  // console.log('storeNFTFromUrl result', result)
  console.log('new:::::::::')
  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS ', formData, {
    // maxBodyLength: 'Infinity',
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
    headers: {
      // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      Authorization: `Bearer ${pinataJWTKey}`,
    },
  })

  console.log('res::::::::', res.data)

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
