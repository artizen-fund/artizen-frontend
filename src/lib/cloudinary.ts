import { assert } from '@lib'

export const uploadToCloudinary = (file: string, callback: (id: string, url: string) => void) => {
  const UPLOAD_PRESET = assert(
    process.env.NEXT_PUBLIC_CLOUDINARY_INSIQNED_PRESET,
    'NEXT_PUBLIC_CLOUDINARY_INSIQNED_PRESET',
  )
  const CLOUDINARY_NAME = assert(process.env.NEXT_PUBLIC_CLOUDINARY_NAME, 'NEXT_PUBLIC_CLOUDINARY_NAME')
  const data = new FormData()
  data.append('file', file)
  data.append('max_width', '5000')
  data.append('upload_preset', UPLOAD_PRESET)
  fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, {
    method: 'POST',
    body: data,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
    .then(response => {
      const rj = response.json()
      console.log('response', rj)
      return rj
    })
    .then(finalFile => {
      console.log('finalFile', finalFile)
      callback(finalFile.id, finalFile.secure_url)
    })
}
