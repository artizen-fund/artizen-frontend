import { createContext, useEffect, useState } from 'react'
import { ISeasonFragment, ISubmissionFragment } from '@types'
import { useSeasonSubscriptionData } from '@lib'

interface ISeasonSubcriptionContext {
  season?: ISeasonFragment | undefined
  loading?: boolean
  arrangedSeasonList?: ISubmissionFragment[] | null
  seasonIsActive?: boolean
}

export const SeasonSubcriptionContext = createContext<ISeasonSubcriptionContext>({})

export const SeasonSubcriptionProvider = ({ children }: SimpleComponentProps) => {
  const { season, loading, arrangedSeasonList, seasonIsActive } = useSeasonSubscriptionData()

  console.log('SeasonSubcriptionProvider season', season)

  return (
    <SeasonSubcriptionContext.Provider
      value={{
        season,
        loading,
        arrangedSeasonList,
        seasonIsActive,
      }}
    >
      {children}
    </SeasonSubcriptionContext.Provider>
  )
}
