import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Layout, SettingsHeader, EditProfile, EditSettings, Spinner } from '@components'
import { rgba, useTabbedInfo, Tabs, TabbedContent } from '@lib'
import { palette, breakpoint } from '@theme'
import { usePrivy } from '@privy-io/react-auth'

const Settings = () => {
  const router = useRouter()
  const { authenticated } = usePrivy()

  useEffect(() => {
    if (!authenticated) router.push('/')
  }, [authenticated])

  const tabs = [
    <Tab label="Profile" key="tab-profile">
      <EditProfile />
    </Tab>,
    <Tab label="Settings" key="tab-settings">
      <EditSettings />
    </Tab>,
  ]

  const { activeTab, setTab } = useTabbedInfo(tabs, true)

  return (
    <Layout>
      {authenticated ? (
        <Spinner />
      ) : (
        <>
          <SettingsHeader>
            <StyledTabs {...{ activeTab, setTab, tabs }} />
          </SettingsHeader>
          <Main>
            <TabbedContent {...{ tabs, activeTab }} />
          </Main>
        </>
      )}
    </Layout>
  )
}

const Main = styled.div`
  max-width: calc(100vw - 48px);
  margin: 75px auto;
  padding: 40px;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: 680px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 760px;
  }

  background: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 16px;
`

const StyledTabs = styled(props => <Tabs {...props} />)`
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  justify-content: center;
`

const Tab = styled.div<{ label: string }>``

export default Settings
