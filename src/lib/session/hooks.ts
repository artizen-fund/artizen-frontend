import { useContext } from 'react'
import { SessionContext, SessionDispatchContext } from './Provider'

export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContext')
  }
  return context
}

export const useSessionDispatch = () => {
  const context = useContext(SessionDispatchContext)
  if (context === undefined) {
    throw new Error('useSessionDispatch must be used within a SessionDispatchContext')
  }
  return context
}
