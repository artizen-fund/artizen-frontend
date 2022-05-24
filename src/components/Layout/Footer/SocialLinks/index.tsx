import styled from 'styled-components'
import Link from 'next/link'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const SocialLinks = () => {
  return (
    <Wrapper>
      <SocialLink href="https://twitter.com" icon="twitter">
        Twitter
      </SocialLink>
      <SocialLink href="https://discord.com" icon="discord">
        Discord
      </SocialLink>
      <SocialLink href="https://github.com" icon="github">
        Github
      </SocialLink>
      <SocialLink href="https://telegram.com" icon="telegram">
        Telegram
      </SocialLink>
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
  background-image: url('/socialIcons/${props => props.icon}.svg');
`

export default SocialLinks
