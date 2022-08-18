import React, { useState, useEffect, cloneElement } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { typography, palette, breakpoint } from '@theme'
import { rgba } from '@lib'
import { kebabCase } from 'lodash'

export interface TabbedInfoProps {
  withHashChanges?: boolean
  children: React.ReactElement<TabProps>[]
}

export interface TabProps {
  label: string
  visible?: boolean
  children: React.ReactNode
}

const TabbedInfo = ({ withHashChanges, children }: TabbedInfoProps) => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>()
  useEffect(() => {
    setActiveTab(kebabCase(children[0].props.label))

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

  return (
    <Wrapper>
      <Tabs>
        {children.map((child, index) => (
          <Tab
            key={`tab-${index}`}
            onClick={() => setTab(kebabCase(child.props.label))}
            active={(!activeTab && index === 0) || activeTab === kebabCase(child.props.label)}
          >
            {child.props.label}
          </Tab>
        ))}
      </Tabs>
      {children.filter(child => kebabCase(child.props.label) === activeTab)}
    </Wrapper>
  )
}

const TabContent = styled.div

const Wrapper = styled.div`
  grid-area: tabbedInfo;
  p {
    margin-bottom: 1em;
  }
`

const Tabs = styled.ul`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
  margin: 40px 0px 35px 0px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin: 50px 0px 45px 0px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    margin: 60px 0px 55px 0px;
  }
`

const Tab = styled.div<{ active: boolean }>`
  ${typography.label.l1}
  color: ${rgba(palette.night)};
  border-bottom: 2px solid ${rgba(palette.night, 0)};
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  &:hover {
    border-color: ${rgba(palette.night, 1)};
  }
  ${props =>
    props.active &&
    `
    color: ${rgba(palette.black)};
    border-color: ${rgba(palette.black, 1)};
  `}
`

export default TabbedInfo
