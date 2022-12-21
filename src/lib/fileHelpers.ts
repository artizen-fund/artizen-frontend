export const fileType = (file?: File) => {
  if (!file) return undefined
  switch (file.type) {
    case 'video/mp4':
      return 'video'
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
      return 'image'
    default:
      return undefined
  }
}
