import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { kebabCase } from 'lodash'
import TabbedContent from './TabbedContent'
import Tabs from './Tabs'

const useTabbedInfo = (tabs: Array<React.ReactElement>, withHashChanges: boolean) => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>()

  useEffect(() => {
    setActiveTab(kebabCase(tabs[0].props.label))
    if (!withHashChanges) {
      return // don't bind hash changes
    }
    const onHashChangeStart = (url: string) => {
      const hash = url.split('#')[1]
      if (hash !== activeTab) {
        setActiveTab(hash)
      }
    }
    router.events.on('hashChangeStart', onHashChangeStart)
    return () => router.events.off('hashChangeStart', onHashChangeStart)
  }, [])

  const setTab = (tabKey: string) => {
    if (!withHashChanges) {
      setActiveTab(tabKey)
    } else {
      router.replace(`#${tabKey}`, undefined, { scroll: false })
    }
  }

  return {
    activeTab,
    setTab,
  }
}

export { useTabbedInfo, TabbedContent, Tabs }
