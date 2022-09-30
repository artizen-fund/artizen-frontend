import { assert } from '@lib'

export const uploadToCloudinary = async (file: File) => {
  try {
    const UPLOAD_PRESET = assert(
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET,
      'NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET',
    )
    const CLOUDINARY_NAME = assert(process.env.NEXT_PUBLIC_CLOUDINARY_NAME, 'NEXT_PUBLIC_CLOUDINARY_NAME')
    const data = new FormData()
    data.append('file', file)
    data.append('max_width', '5000')
    data.append('upload_preset', UPLOAD_PRESET)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, {
      method: 'POST',
      body: data,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    return response.json()
  } catch (error) {
    console.error('Error uploading to Cloudinary', error)
  }
}
