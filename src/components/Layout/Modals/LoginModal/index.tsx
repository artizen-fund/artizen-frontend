import { useContext, useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import styled from 'styled-components'
import { useConnect, useSignMessage, Connector } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { CloseButton, CheckboxControl } from '@components'
import { CheckWrapper, Check, CheckMessage } from '../../Header/SessionShelf/_common'
import { rgba, LayoutContext, assertInt, getWagmiClient, assetPath } from '@lib'
import { palette, typography } from '@theme'

const LoginModal = ({ ...props }) => {
  const { toggleModal } = useContext(LayoutContext)

  const { connectAsync } = useConnect()
  const { signMessageAsync } = useSignMessage()
  const { chains } = getWagmiClient()

  const [enabled, setEnabled] = useState(true)

  const connectWallet = async (connector: Connector) => {
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const { account: publicAddress, chain } = await connectAsync({
      connector,
      chainId,
    })

    const userData = { address: publicAddress, chain: chain.id, network: 'evm' }

    const response = await fetch('/api/auth/request-message', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'content-type': 'application/json',
      },
    })

    const { message } = await response.json()
    const signature = await signMessageAsync({ message })

    await signIn('credentials', { message, signature, redirect: false })
    // note: AccountButton component is the real session watcher;
    //       it'll pick up useSession and get the user from Hasura.

    toggleModal?.()
  }

  return (
    <Wrapper {...props}>
      <Headline>Connect your wallet</Headline>
      <Subhead>WalletConnect provides options for mobile and desktop.</Subhead>

      <Tiles>
        <Tile
          image="/assets/metamask.svg"
          onClick={() => connectWallet(new InjectedConnector({ chains }))}
          {...{ enabled }}
        >
          Metamask
        </Tile>

        <Tile
          image="/assets/walletConnect.svg"
          onClick={() =>
            connectWallet(
              new WalletConnectConnector({
                chains,
                options: {
                  qrcode: true,
                },
              }),
            )
          }
          {...{ enabled }}
        >
          WalletConnect
        </Tile>
      </Tiles>

      <CheckWrapper>
        <Check>
          <CheckboxControl data={enabled} path="not-used" handleChange={() => setEnabled(!enabled)} label="" />
          <CheckMessage>
            I agree to Artizen’s <Link href="/privacy-policy">Privacy Policy</Link>
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
