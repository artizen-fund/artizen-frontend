import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Layout,
  SettingsHeader,
  EditProfile,
  TabbedInfo,
  EditWallet,
  EditSettings,
  EditNotifications,
  EditCollection,
  PagePadding,
} from '@components'
import { UserContext, rgba } from '@lib'
import { typography, palette, breakpoint } from '@theme'

const Settings = () => {
  const router = useRouter()
  const { loading, loggedInUser } = useContext(UserContext)

  useEffect(() => {
    /* todo: If a user has an active session and lands on this page from "nowhere," it will punt them home.
     * That isn't a desired action, but all my attempts at "waiting" a moment for a session are causing render glitches.
     * This makes dev a headache (will forward on every site refresh), but since it's an edge case, I'm punting it.
     */
    if (!loading && !loggedInUser) router.push('/')
  }, [])

  return !loggedInUser ? (
    <></>
  ) : (
    <Layout>
      <SettingsHeader />
      <Main>
        <EditProfile />
      </Main>
    </Layout>
  )
}

const Main = styled.div`
  max-width: calc(100vw - 48px);
  margin: 75px auto;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: 680px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 760px;
  }

  padding: 40px;

  background: ${rgba(palette.white)};

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`

const Tab = styled.div<{ label: string }>``

export default Settings
