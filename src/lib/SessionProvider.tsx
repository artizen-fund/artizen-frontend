import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

interface ProviderProps {
  children: React.ReactNode
  user: ArtizenUser | undefined
  setUser: Dispatch<SetStateAction<ArtizenUser | undefined>>
}

const SessionContext = createContext<ArtizenUser | undefined>(undefined)
const SessionDispatchContext = createContext<Dispatch<SetStateAction<ArtizenUser | undefined>> | undefined>(undefined)

export const SessionProvider = ({ children, user, setUser }: ProviderProps) => {
  return (
    <SessionContext.Provider value={user}>
      <SessionDispatchContext.Provider value={setUser}>{children}</SessionDispatchContext.Provider>
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)
  return context
}

export const useSessionDispatch = () => {
  const context = useContext(SessionDispatchContext)
  return context
}
