import { IArtifactFragment } from '@types'
import { PinataPinResponse } from '@pinata/sdk'

const sendData = async (data: string): Promise<PinataPinResponse> => {
  const response = await fetch('/api/publishNFT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return response.json()
}

export { sendData }
