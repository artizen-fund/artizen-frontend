import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { Button, AvatarUploadWidget, BannerUploadWidget } from '@components'
import { rgba } from '@lib'
import { GET_SELF } from '@gql'
import { breakpoint, palette, typography } from '@theme'
import { monthNames } from '@copy/common'
import { Maybe, IGetSelfQuery } from '@types'

const SettingsHeader = ({ children }: { children: React.ReactElement }) => {
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })

  const [dateJoined, setDateJoined] = useState<string>()
  useEffect(() => {
    if (!loggedInUser) return
    // todo: this is some jank ass typescript :\
    const dateJoinedAsDate = new Date(loggedInUser.Users[0].createdAt as unknown as string)
    setDateJoined(`${monthNames[dateJoinedAsDate.getMonth()]} ${dateJoinedAsDate.getFullYear()}`)
  }, [loggedInUser])

  return !loggedInUser ? (
    <></>
  ) : (
    <header>
      <PersonalBannerGraphic bannerImage={loggedInUser.Users[0].bannerImage}>
        <Content>
          <BannerUploadWidget />
        </Content>
        <AvatarUploadWidget />
      </PersonalBannerGraphic>
      <Main>
        <Content>
          <Name>
            {loggedInUser.Users[0].firstName} {loggedInUser.Users[0].lastName}
          </Name>
          <HandleLine>
            {loggedInUser.Users[0].artizenHandle && <span>@{loggedInUser.Users[0].artizenHandle}</span>}
            <span>Joined {dateJoined}</span>
          </HandleLine>
          {loggedInUser.Users[0].bio && <Biography>{loggedInUser.Users[0].bio}</Biography>}
          <SocialLinks>
            {!!loggedInUser.Users[0].twitterHandle && (
              <Button
                glyphOnly
                glyph="twitter"
                level={1}
                outline
                href={`https://twitter.com/${loggedInUser.Users[0].twitterHandle}`}
                target="_blank"
              >
                @{loggedInUser.Users[0].twitterHandle}
              </Button>
            )}
            {!!loggedInUser.Users[0].discordHandle && (
              <Button
                glyphOnly
                glyph="discord"
                level={1}
                outline
                href={`https://discordapp.com/users/${loggedInUser.Users[0].discordHandle}`}
                target="_blank"
              >
                @{loggedInUser.Users[0].discordHandle}
              </Button>
            )}
            {!!loggedInUser.Users[0].instagramHandle && (
              <a target="_blank" rel="noreferrer">
                <Button
                  glyphOnly
                  glyph="instagram"
                  level={1}
                  outline
                  href={`https://instagram.com/${loggedInUser.Users[0].instagramHandle}`}
                  target="_blank"
                >
                  @{loggedInUser.Users[0].instagramHandle}
                </Button>
              </a>
            )}
            {!!loggedInUser.Users[0].website && (
              <Button glyphOnly glyph="globe" level={1} outline href={loggedInUser.Users[0].website} target="_blank">
                website
              </Button>
            )}
          </SocialLinks>
          {/*<ProfileLink outline onClick={() => alert('not yet')} level={1} glyph="face">
            See Public Profile
          </ProfileLink>*/}
        </Content>
        {children}
      </Main>
    </header>
  )
}

const PersonalBannerGraphic = styled.div<{ bannerImage?: Maybe<string> }>`
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
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.night)};
  }
  background-size: cover;
  background-position: center center;
  ${props =>
    props.bannerImage &&
    `
    background-image: url(${props.bannerImage});
  `}
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
