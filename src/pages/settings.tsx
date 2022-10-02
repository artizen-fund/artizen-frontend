import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Layout,
  TabbedInfo,
  EditProfile,
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

  return (
    <Layout>
      {!!loggedInUser && (
        <>
          <Header>
            <Title>Profile</Title>
            <Description>
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et.
            </Description>
          </Header>

          <Main>
            <EditSpace>
              <EditProfile />
            </EditSpace>
          </Main>
        </>
      )}
    </Layout>
  )
}

const Header = styled(props => <PagePadding {...props} />)``

const Title = styled.h1`
  ${typography.title.l1};
`

const Description = styled.h2`
  ${typography.body.l1};
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 75px;

  max-width: calc(100vw - 48px);
  margin: auto;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: 688px;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 944px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 1600px;
  }
`

const EditSpace = styled.div``

const Tab = styled.div<{ label: string }>``

export default Settings
