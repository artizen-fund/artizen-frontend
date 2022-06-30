import { createContext, useReducer, ReactNode } from 'react'
import { SessionState, initialState } from './state'
import { Dispatch } from './actions'
import { reducer, dispatchMiddleware } from './reducer'

export const SessionContext = createContext<SessionState | undefined>(initialState)

export const SessionDispatchContext = createContext<Dispatch | undefined>(undefined)

interface ProviderProps {
  children: ReactNode
}

export const SessionProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SessionContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatchMiddleware(dispatch)}>{children}</SessionDispatchContext.Provider>
    </SessionContext.Provider>
  )
}
