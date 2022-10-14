import { userMetadataVar } from '@lib'

const logout = async (): Promise<void> => {
  userMetadataVar(undefined)
  await fetch('/api/endSession', {
    method: 'POST',
  })

  localStorage.clear()
}

export { logout }
