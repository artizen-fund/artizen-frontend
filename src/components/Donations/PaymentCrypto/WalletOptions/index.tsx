import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { palette, typography } from '@theme'

interface IWalletOptions {
  connectWallet: (s: string) => void
}

const WalletOptions = ({ connectWallet }: IWalletOptions) => {
  return (
    <Wrapper>
      <WalletOption onClick={() => connectWallet('metamask')}>
        <img src={assetPath('/assets/metamask.svg')} alt="connect with MetaMask" />
        <OptionTitle>MetaMask</OptionTitle>
        <OptionSubtitle>Connect via your browser</OptionSubtitle>
      </WalletOption>
      <WalletOption onClick={() => connectWallet('walletconnect')}>
        <img src={assetPath('/assets/walletConnect.svg')} alt="connect with WalletConnect" />
        <OptionTitle>WalletConnect</OptionTitle>
        <OptionSubtitle>Choose an alternative wallet</OptionSubtitle>
      </WalletOption>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-area: walletOptions;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  &:after {
    position: absolute;
    left: 50%;
    top: 0;
    width: 0.5px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
    content: ' ';
  }
`

const WalletOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  img {
    margin-bottom: 15px;
  }
`

const OptionTitle = styled.h3`
  ${typography.title.l4}
`
const OptionSubtitle = styled.h4`
  ${typography.label.l2}
`

export default WalletOptions
