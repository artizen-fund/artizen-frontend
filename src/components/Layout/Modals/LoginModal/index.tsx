import { useContext, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { CloseButton, CheckboxControl } from '@components'
import { CheckWrapper, Check, CheckMessage } from '../../Header/SessionShelf/_common'
import { rgba, assetPath, LayoutContext } from '@lib'
import { palette, typography } from '@theme'
import useWalletConnect from './lib'

const LoginModal = ({ ...props }) => {
  const { connectMetamask, connectOtherWallet } = useWalletConnect()
  const { toggleModal } = useContext(LayoutContext)

  const [enabled, setEnabled] = useState(true)

  return (
    <Wrapper {...props}>
      <Headline>Connect your wallet</Headline>
      <Subhead>WalletConnect provides options for mobile and desktop.</Subhead>

      <Tiles>
        <Tile image="/assets/metamask.svg" onClick={() => connectMetamask()} {...{ enabled }}>
          Metamask
        </Tile>

        <Tile image="/assets/walletConnect.svg" onClick={() => connectOtherWallet} {...{ enabled }}>
          WalletConnect
        </Tile>
      </Tiles>

      <CheckWrapper>
        <Check>
          <CheckboxControl data={enabled} path="not-used" handleChange={() => setEnabled(!enabled)} label="" />
          <CheckMessage>
            I agree to Artizen’s{' '}
            <Link href="https://help.artizen.fund/en/articles/4761373-privacy-policy" target="_blank">
              Privacy Policy
            </Link>
          </CheckMessage>
        </Check>
      </CheckWrapper>

      <CloseButton onClick={() => toggleModal?.()} />
    </Wrapper>
  )
}

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Tile = styled.div<{ image: string; enabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 340px;
  height: 175px;

  background-image: url(${props => assetPath(props.image)});
  background-repeat: no-repeat;
  background-position: center;

  cursor: ${props => (props.enabled ? 'pointer' : 'not-allowed')};
  pointer-events: ${props => (props.enabled ? 'all' : 'none')};

  ${typography.title.l4}
`

const Wrapper = styled.div`
  padding: 50px;
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
`

const Headline = styled.h1`
  ${typography.title.l2}
`

const Subhead = styled.p`
  ${typography.body.l2}
`

export default LoginModal
