import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { CheckboxControl, Icon, Button } from '@components'
import { CheckWrapper, Check, CheckMessage } from '../../Header/SessionShelf/_common'
import { rgba, assetPath, LayoutContext, textCrop, assert } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { connectWallet, signInWalletMessage } from '@copy/common'
import { useWalletAuthFlow, ConnectingComp } from './lib/'

const LoginModal = ({ ...props }) => {
  const { toggleModal } = useContext(LayoutContext)
  const { connectMetamask, connectOtherWallet, signEnMessage, currentFlow, isAuthenticated } = useWalletAuthFlow()
  const [enabled, setEnabled] = useState(true)

  console.log('currentFlow', currentFlow)

  const isMobile = navigator.maxTouchPoints > 1

  useEffect(() => {
    if (isAuthenticated()) {
      toggleModal()
    }
  }, [isAuthenticated])

  //TODO: Write a wrapper component with tiles
  //and abstract the connect to wallet and the sign message components
  return (
    <Wrapper {...props}>
      {currentFlow === 'toConnect' && (
        <>
          <Headline>{connectWallet.headline}</Headline>
          <Subhead>{connectWallet.subhead}</Subhead>
          <Tiles>
            {/* EricJ: I really need to check if it's a mobile regarless of the screensize, 
        so I am trying maxTouchPoints as recommended with MDN but happy to use a more relaiable approach */}
            {!isMobile && (
              <Tile
                id="btMetamask"
                onClick={() => {
                  connectMetamask()
                }}
                {...{ enabled }}
              >
                <img src={assetPath('/assets/metamask.svg')} alt="Metamask" />
                Metamask
              </Tile>
            )}

            <Tile onClick={() => connectOtherWallet()} {...{ enabled }}>
              <img src={assetPath('/assets/walletConnect.svg')} alt="WalletConnect" />
              WalletConnect
            </Tile>
          </Tiles>

          <CheckWrapper>
            <Check>
              <CheckboxControl data={enabled} path="not-used" handleChange={() => setEnabled(!enabled)} label="" />
              <CheckMessage>
                {/* TODO: move this to Copy doc */}
                <Link href="https://help.artizen.fund/en/articles/4761373-privacy-policy" target="_blank">
                  {connectWallet.privacyMessage}
                </Link>
              </CheckMessage>
            </Check>
          </CheckWrapper>
        </>
      )}

      {currentFlow === 'toSignMessage' && (
        <>
          <Headline>{signInWalletMessage.headline}</Headline>
          <Subhead>{signInWalletMessage.subhead}</Subhead>
          <Tiles>
            <Tile id="signMessage" enabled={true}>
              <Button glyph="external" level={1} outline onClick={() => signEnMessage()} {...{ enabled }}>
                {signInWalletMessage.buttonCopy}
              </Button>
            </Tile>
          </Tiles>
        </>
      )}
      {currentFlow === 'connecting' && <ConnectingComp />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 40px 25px;
  max-width: calc(100vw - 20px);

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    padding: 40px;
    max-width: 507px;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: none;
    width: 416px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 65px;
    width: 568px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 80px;
    width: 840px;
  }
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
`

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 40px 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 50px 0;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 60px 0;
  }
`

const Tile = styled.div<{ enabled: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;

  cursor: ${props => (props.enabled ? 'pointer' : 'not-allowed')};
  pointer-events: ${props => (props.enabled ? 'all' : 'none')};

  ${typography.title.l4}
`

const Headline = styled.h1`
  ${textCrop(typography.title.l2)}
`

const Subhead = styled.p`
  ${typography.body.l2}
  margin-top: 1em;
`

export default LoginModal
