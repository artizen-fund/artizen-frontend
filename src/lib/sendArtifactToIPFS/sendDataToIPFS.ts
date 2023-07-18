import { PinataPinResponse } from '@pinata/sdk'

const sendDataToAPI = async (data: string): Promise<PinataPinResponse> => {
  console.log('data in here ', data)
  const response = await fetch('/api/uploadDataToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: data,
  })

  const result = await response.json()

  console.log('sendDataToAPI result', result)

  return result
}

export { sendDataToAPI }
