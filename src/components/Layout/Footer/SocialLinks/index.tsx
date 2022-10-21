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
  transition: background-color 0.25s ease-in-out, transform 0.4s cubic-bezier(0.42, 0.97, 0.52, 1.49);

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    &:hover {
      background-color: ${rgba(palette.algae)};
      transform: translate3d(0, -4px, 0) scale3d(1.08, 1.08, 1);
      & * {
        background-color: ${rgba(palette.white)};
      }
    }
  }
`

export default SocialLinks
