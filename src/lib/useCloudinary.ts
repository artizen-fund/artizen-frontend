import { assert } from '@lib'
import { useState } from 'react'

const useCloudinary = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>()

  const upload = async (file: File) => {
    const UPLOAD_PRESET = assert(
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET,
      'NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET',
    )
    const CLOUDINARY_NAME = assert(process.env.NEXT_PUBLIC_CLOUDINARY_NAME, 'NEXT_PUBLIC_CLOUDINARY_NAME')
    const data = new FormData()
    data.append('file', file)
    data.append('max_width', '5000')
    data.append('upload_preset', UPLOAD_PRESET)
    setUploading(true)
    setError(undefined)
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, {
        method: 'POST',
        body: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      const json = await response.json()
      if (json.error) {
        setError(json.error.message)
        throw new Error(json.error)
      }
      setUploading(false)
      return json
    } catch (error) {
      setUploading(false)
      console.error('error uploading to cloudinary', error)
    }
  }
  /*TODO: Add Pixel density*/
  const addParamsToLink = (url: string, attrs: string, type: string): string => {
    const prefixUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${type}/upload`
    const secondPart = url.substr(prefixUrl.length + 1, url.length)

    return `${prefixUrl}/${attrs}/${secondPart}`
  }

  return { upload, uploading, error, addParamsToLink }
}

export { useCloudinary }
