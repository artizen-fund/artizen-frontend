import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba, assetPath } from '@lib'

const SocialLinks = () => {
  const networks: Record<string, string> = {
    twitter: 'https://twitter.com/artizenfund',
    discord: 'https://artizen.link/discord',
    github: 'https://github.com/artizen-fund',
    telegram: 'https://artizen.link/telegram',
  }
  return (
    <Wrapper>
      {Object.keys(networks).map(network => (
        <SocialLink href={networks[network]} icon={network} target="_blank" key={`social-link-${network}`}>
          {network}
        </SocialLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 12px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }
`

const SocialLink = styled.a<{ icon: string }>`
  display: block;
  width: 56px;
  height: 56px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    width: 64px;
    height: 64px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 72px;
    height: 72px;
  }

  text-indent: -1000px;
  overflow: hidden;
  border-radius: 9999px;
  background-color: ${rgba(palette.white)};
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${assetPath('/socialIcons/${props => props.icon}.svg')});
`

export default SocialLinks
