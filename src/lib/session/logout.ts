import { userMetadataVar } from '@lib'

const logout = async (): Promise<void> => {
  localStorage.removeItem('token')
  userMetadataVar(undefined)
  await fetch('/api/endSession', {
    method: 'POST',
  })
}

export { logout }
