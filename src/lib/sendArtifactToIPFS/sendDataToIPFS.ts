import { IArtifactFragment } from '@types'
import { PinataPinResponse } from '@pinata/sdk'

const sendDataToAPI = async (data: string): Promise<PinataPinResponse> => {
  const response = await fetch('/api/uploadDataToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return response.json()
}

export { sendDataToAPI }
