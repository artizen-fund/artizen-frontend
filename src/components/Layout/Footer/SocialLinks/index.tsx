import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Button } from '@components'
import { socialLinks } from '@copy/common'

const SocialLinks = () => {
  return (
    <Wrapper>
      {Object.keys(socialLinks).map(network => (
        <StyledButton
          key={`social-link-${network}`}
          glyph={network}
          glyphOnly
          alt={network}
          href={socialLinks[network]}
          target="_blank"
          inverted
        >
          {network}
        </StyledButton>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    justify-content: flex-start;
    gap: 12px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transition: background-color 0.25s ease-in-out, transform 0.35s ease-in-out;

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    &:hover {
      background-color: ${rgba(palette.algae)};
      transform: translate3d(0, -5px, 0) scale3d(1.04, 1.02, 1);
    }
    &:hover > * {
      background-color: ${rgba(palette.white)};
    }
  }
`

export default SocialLinks
