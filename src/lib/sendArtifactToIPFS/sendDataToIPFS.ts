import { PinataPinResponse } from '@pinata/sdk'

const sendDataToAPI = async (data: string): Promise<PinataPinResponse> => {
  console.log('data  ', data)
  const response = await fetch('/api/uploadDataToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: data,
  })

  return response.json()
}

export { sendDataToAPI }
