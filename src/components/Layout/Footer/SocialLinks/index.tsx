import styled from 'styled-components'
import { breakpoint } from '@theme'
import { Button } from '@components'
import { socialLinks } from '@copy/common'

const SocialLinks = () => {
  return (
    <Wrapper>
      {Object.keys(socialLinks).map(network => (
        <Button
          key={`social-link-${network}`}
          glyph={network}
          glyphOnly
          alt={network}
          href={socialLinks[network]}
          target="_blank"
        >
          {network}
        </Button>
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

export default SocialLinks
