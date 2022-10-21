import { useContext, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, breakpoint, typography } from '@theme'

const Share = () => {
  const { visibleModal, toggleModal } = useContext(LayoutContext)

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
    <Wrapper>
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
          <Button {...{ link, title }} onClick={() => window?.open(facebookLink, '_blank')} glyph="facebook" glyphOnly>
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
