import { useState, useMemo } from 'react'

const useFormLocalStorage = <T>(localStorageKey: string, initialState: T) => {
  const [data, setData] = useState<T>(initialState)

  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(localStorageKey)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  return [data, setData] as const
}

export { useFormLocalStorage }
