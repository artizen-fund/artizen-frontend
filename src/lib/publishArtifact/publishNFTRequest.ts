import { IArtifactFragment } from '@types'
import { PinataPinResponse } from '@pinata/sdk'

const publishNFTRequest = async (data: string): Promise<PinataPinResponse> => {
  const response = await fetch('/api/publishNFT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return response.json()
}

const publishImageNFT = async (artifact: IArtifactFragment, artifactName: string) => {
  return await publishNFTRequest(
    JSON.stringify({
      imagePath: artifact.artwork,
      name: `${artifactName}-image`,
      description: artifact.description,
    }),
  )
}

const publishVideoNFT = async (artifact: IArtifactFragment, artifactName: string) => {
  if (artifact.video) {
    return await publishNFTRequest(
      JSON.stringify({
        imagePath: artifact.video,
        name: `${artifactName}-video`,
        // description: artifact.description,
      }),
    )
  }
  return undefined
}

export { publishNFTRequest, publishImageNFT, publishVideoNFT }
