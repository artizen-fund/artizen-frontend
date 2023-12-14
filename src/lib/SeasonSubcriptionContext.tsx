import { createContext, useEffect, useState } from 'react'
import { ISeasonFragment, ISubmissionFragment } from '@types'
import { useSeasonSubscriptionData } from '@lib'

interface ISeasonSubcriptionContext {
  season?: ISeasonFragment | undefined
  loading?: boolean
  arrangedSeasonList?: ISubmissionFragment[] | null
  seasonIsActive?: boolean
  totalSales?: number
  totalPrizePooled?: number
  totalBase?: number
}

export const SeasonSubcriptionContext = createContext<ISeasonSubcriptionContext>({})

export const SeasonSubcriptionProvider = ({ children }: SimpleComponentProps) => {
  const { season, loading, arrangedSeasonList, seasonIsActive, totalSales, totalPrizePooled, totalBase } =
    useSeasonSubscriptionData()

  return (
    <SeasonSubcriptionContext.Provider
      value={{
        season,
        loading,
        arrangedSeasonList,
        seasonIsActive,
        totalSales,
        totalPrizePooled,
        totalBase
      }}
    >
      {children}
    </SeasonSubcriptionContext.Provider>
  )
}
