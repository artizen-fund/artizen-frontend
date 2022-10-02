import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { rgba, UserContext } from '@lib'
import { breakpoint, palette, typography } from '@theme'
import { monthNames } from '@copy/common'

const SettingsHeader = ({ children }: { children: React.ReactElement }) => {
  const { loggedInUser } = useContext(UserContext)

  const [dateJoined, setDateJoined] = useState<string>()
  useEffect(() => {
    if (!loggedInUser) return
    // @ts-ignore
    const dateJoinedAsDate = new Date(loggedInUser.created_at)
    setDateJoined(`${monthNames[dateJoinedAsDate.getMonth()]} ${dateJoinedAsDate.getFullYear()}`)
  }, [loggedInUser])

  return !loggedInUser ? (
    <></>
  ) : (
    <header>
      <PersonalBannerGraphic>
        <ProfileAvatar profileImage={loggedInUser?.profileImage!} />
      </PersonalBannerGraphic>
      <Main>
        <Content>
          <Name>
            {loggedInUser.firstName} {loggedInUser.lastName}
          </Name>
          <HandleLine>
            {loggedInUser.artizenHandle && <span>@{loggedInUser.artizenHandle}</span>}
            <span>Joined {dateJoined}</span>
          </HandleLine>
          {loggedInUser.bio && <Biography>{loggedInUser.bio}</Biography>}
          <SocialLinks>
            {!!loggedInUser.twitterHandle && (
              <Button
                glyphOnly
                glyph="twitter"
                level={1}
                outline
                href={`https://twitter.com/${loggedInUser.twitterHandle}`}
                target="_blank"
              >
                @{loggedInUser.twitterHandle}
              </Button>
            )}
            {!!loggedInUser.discordHandle && (
              <Button
                glyphOnly
                glyph="discord"
                level={1}
                outline
                href={`https://discordapp.com/users/${loggedInUser.discordHandle}`}
                target="_blank"
              >
                @{loggedInUser.discordHandle}
              </Button>
            )}
            {!!loggedInUser.instagramHandle && (
              <a target="_blank" rel="noreferrer">
                <Button
                  glyphOnly
                  glyph="instagram"
                  level={1}
                  outline
                  href={`https://instagram.com/${loggedInUser.instagramHandle}`}
                  target="_blank"
                >
                  @{loggedInUser.instagramHandle}
                </Button>
              </a>
            )}
            {!!loggedInUser.website && (
              <Button glyphOnly glyph="globe" level={1} outline href={loggedInUser.website} target="_blank">
                website
              </Button>
            )}
          </SocialLinks>
          <ProfileLink outline onClick={() => alert('not yet')} level={1} glyph="face">
            See Public Profile
          </ProfileLink>
        </Content>
        {children}
      </Main>
    </header>
  )
}

const PersonalBannerGraphic = styled.div<{ bannerImage?: string }>`
  position: relative;
  width: 100%;
  height: 128px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    height: 150px;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    height: 200px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 248px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 320px;
  }

  background-color: ${rgba(palette.stone)};
  background-size: cover;
  background-position: center center;
  ${props =>
    props.bannerImage &&
    `
    background-image: url(${props.bannerImage});
  `}
`

const ProfileAvatar = styled.div<{ profileImage?: string }>`
  position: absolute;
  z-index: 1;
  width: 104px;
  height: 104px;
  left: calc(50% - 52px);
  bottom: -52px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 132px;
    height: 132px;
    left: calc(50% - 66px);
    bottom: -66px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 160px;
    height: 160px;
    left: calc(50% - 80px);
    bottom: -80px;
  }

  border-radius: 9999px;
  border: 4px solid ${rgba(palette.white)};
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    border-width: 6px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    border-width: 8px;
  }
  background: ${rgba(palette.stone)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${props => `background-image: url('${props.profileImage}');`}
`

const Main = styled.main`
  position: relative;
  padding: 10px;
  background: ${rgba(palette.white)};
  box-shadow: 0px 0.5px 0px #d9dbe0;
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
    box-shadow: 0px 0.5px 0px rgba(114, 124, 140, 0.64);
  }
`

const Content = styled.div`
  position: relative;
  margin: auto;
  max-width: calc(100vw - 48px);
  padding: 75px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: 688px;
    padding: 80px 0;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: calc(100vw - 320px);
    padding: 100px 0;
  }
  @media only screen and (min-width: 1940px) {
    max-width: 1600px;
    padding: 125px 0;
  }
  text-align: center;
`

const Name = styled.h1`
  ${typography.title.l2}
`

const HandleLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  span {
    position: relative;
    padding: 0 10px;
    &:nth-child(2):before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 2px;
        width: 1px;
        height: 15px;
        background: ${rgba(palette.barracuda)};
      }
    }
  }
  color: ${rgba(palette.barracuda)};
  ${typography.label.l1}
`

const Biography = styled.p`
  ${typography.body.l2}
`

const SocialLinks = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const ProfileLink = styled(props => <Button {...props} />)`
  position: absolute;
  top: 0;
  left: 0;
`

export default SettingsHeader
