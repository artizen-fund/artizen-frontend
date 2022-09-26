import React, { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Layout,
  TabbedInfo,
  ProfileCard,
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
  const { loggedInUser, loading } = useContext(UserContext)
  if (loading === false && !loggedInUser) {
    /* Why `loading === false` and not `!loading`?
     * The context starts up in either undefined or false state.
     * We want to be very clear about the check having happened and the user not being present.
     */
    router.push('/')
  }

  const tabbedInfo: Record<string, React.ReactNode> = {
    Profile: <EditProfile />,
    Wallet: <EditWallet />,
    Settings: <EditSettings />,
    Notifications: <EditNotifications />,
    Collection: <EditCollection />,
  }

  return (
    <Layout>
      <Header>
        <Title>Profile</Title>
        <Description>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna,
          vel scelerisque nisl consectetur et.
        </Description>
      </Header>

      <Main>
        <ProfileCard />
        <EditSpace>
          <TabbedInfo withHashChanges>
            {Object.keys(tabbedInfo).map(key => (
              <Tab key={`tab-${key}`} label={key}>
                {tabbedInfo[key]}
              </Tab>
            ))}
          </TabbedInfo>
        </EditSpace>
      </Main>
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

const EditSpace = styled.div`
  width: 100%;

  padding: 40px;
  gap: 32px;
  background: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`

const Tab = styled.div<{ label: string }>``

export default Settings
