import { useContext, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, breakpoint, typography } from '@theme'
import { sharingModal } from '@copy/common'

const Share = () => {
  const { modalAttrs } = useContext(LayoutContext)

  const link = `https://artizen.fund${!!modalAttrs?.destination ? modalAttrs.destination : ''}`
  const title = 'Artizen'
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    sharingModal.twitterMessage,
  )}&url=${encodeURIComponent(link)}`
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&t=${encodeURIComponent(
    sharingModal.facebookMessage,
  )}`
  const redditLink = `http://www.reddit.com/submit?url=${encodeURIComponent(
    sharingModal.redditMessage,
  )}&title=${encodeURIComponent('Artizen Fund')}`
  const mailLink = encodeURIComponent(link)

  const [copied, setCopied] = useState(false)

  return (
    <Wrapper>
      <Copy>
        <Header>{sharingModal.headline}</Header>
        <Subheader>{sharingModal.subhead}</Subheader>
      </Copy>
      <Row>
        <ButtonWithLabel color="moon">
          <StyledButton
            {...{ link, title }}
            onClick={() => window?.open(twitterLink, '_blank')}
            glyph="twitter"
            glyphOnly
          >
            Twitter
          </StyledButton>
          <ButtonLabel>Twitter</ButtonLabel>
        </ButtonWithLabel>
        <ButtonWithLabel color="moon">
          <StyledButton
            {...{ link, title }}
            onClick={() => window?.open(facebookLink, '_blank')}
            glyph="facebook"
            glyphOnly
          >
            Facebook
          </StyledButton>
          <ButtonLabel>Facebook</ButtonLabel>
        </ButtonWithLabel>
        <ButtonWithLabel color="moon">
          <StyledButton {...{ link, title }} onClick={() => window?.open(redditLink, '_blank')} glyph="share" glyphOnly>
            Reddit
          </StyledButton>
          <ButtonLabel>Reddit</ButtonLabel>
        </ButtonWithLabel>
      </Row>
      <Row>
        <Rule />
      </Row>
      <Buttons>
        <Button level={1} stretch onClick={() => (location.href = `mailto:?subject=${title}&body=${mailLink}`)}>
          Email Link
        </Button>
        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          <Button level={1} stretch outline>
            {copied && <span>Copied!</span>}
            {!copied && <span>Copy Site URL</span>}
          </Button>
        </CopyToClipboard>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 30px;

  padding: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    width: 416px;
    padding: 30px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 568px;
    padding: 40px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 680px;
  }

  color: ${rgba(palette.night)};
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.slate)};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Header = styled.header`
  ${typography.title.l3}
`

const Subheader = styled.p`
  ${typography.body.l2}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 45px;
`

const Buttons = styled(props => <Row {...props} />)`
  gap: 10px;
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

const ButtonWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const ButtonLabel = styled.div`
  ${typography.title.l4}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const Rule = styled.hr`
  height: 1px;
  width: 100%;
  border: 0;
  outline: 0;
  background: ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.barracuda, 0.64)};
  }
`

export default Share
