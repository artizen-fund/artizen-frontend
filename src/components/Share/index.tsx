import { useContext, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, CloseButton } from '@components'
import { rgba, DonationContext } from '@lib'
import { palette, breakpoint, typography } from '@theme'

const Share = () => {
  const { visibleModal, toggleModal } = useContext(DonationContext)

  const link = 'https://artizen.fund'
  const title = 'Artizen'
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
    link,
  )}`
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    title,
  )}%20${encodeURIComponent(link)}`
  const redditLink = `http://www.reddit.com/submit?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`
  const mailLink = encodeURIComponent(link)

  const [copied, setCopied] = useState(false)

  const visible = visibleModal === 'share'

  return (
    <Wrapper {...{ visible }}>
      <ClickToDismiss onClick={() => toggleModal?.()} />
      <Modal>
        <CloseButton glyph="cross" level={1} onClick={() => toggleModal?.()} {...{ visible }} />
        <Row>
          <Header color="white_always">Sharing is caring, give back with a like, comment or share</Header>
        </Row>
        <Row>
          <ButtonWithLabel color="moon">
            <Button {...{ link, title }} onClick={() => window?.open(twitterLink, '_blank')} glyph="twitter" glyphOnly>
              Twitter
            </Button>
            <SubLabel>Twitter</SubLabel>
          </ButtonWithLabel>
          <ButtonWithLabel color="moon">
            <Button
              {...{ link, title }}
              onClick={() => window?.open(facebookLink, '_blank')}
              glyph="facebook"
              glyphOnly
            >
              Facebook
            </Button>
            <SubLabel>Facebook</SubLabel>
          </ButtonWithLabel>
          <ButtonWithLabel color="moon">
            <Button {...{ link, title }} onClick={() => window?.open(redditLink, '_blank')} glyph="share" glyphOnly>
              Reddit
            </Button>
            <SubLabel>Reddit</SubLabel>
          </ButtonWithLabel>
          <ButtonWithLabel color="moon">
            <Button
              {...{ link, title }}
              onClick={() => (location.href = `mailto:?subject=${title}&body=${mailLink}`)}
              glyph="plane"
              glyphOnly
            >
              Plane
            </Button>
            <SubLabel>Plane</SubLabel>
          </ButtonWithLabel>
        </Row>
        <Row>
          <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
            <Button level={1} stretch>
              {copied && <span>Copied!</span>}
              {!copied && <span>Copy Site URL</span>}
            </Button>
          </CopyToClipboard>
        </Row>
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible?: boolean }>`
  position: fixed;
  z-index: 103;
  left: 0;
  width: 100%;

  top: 64px;
  height: calc(100vh - 64px);
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: 72px;
    height: calc(100vh - 72px);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
    height: calc(100vh - 88px);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: opacity 0.25s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? 0 : '100px')};);
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

const ClickToDismiss = styled.div`
  position: fixed;
  z-index: 102;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Modal = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 30px;

  padding: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 30px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 40px;
  }

  background-color: ${rgba(palette.night)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 16px;
`

const Header = styled.header`
  ${typography.title.l3}
  color: ${rgba(palette.moon)};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const SubLabel = styled.div`
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`

export default Share
