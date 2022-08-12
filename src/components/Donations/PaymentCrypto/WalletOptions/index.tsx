import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

interface IWalletOptions {
  connetWallet: (s: string) => void
}

const WalletOptions = ({ connetWallet }: IWalletOptions) => {
  return (
    <Wrapper>
      <WalletOption onClick={() => connetWallet('metamask')}>
        <img src="/assets/metamask.svg" alt="connect with MetaMask" />
        <OptionTitle>MetaMask</OptionTitle>
        <OptionSubtitle>Connect via your browser</OptionSubtitle>
      </WalletOption>
      <WalletOption onClick={() => connetWallet('walletconnect')}>
        <img src="/assets/walletConnect.svg" alt="connect with WalletConnect" />
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
