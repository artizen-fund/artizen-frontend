import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { LayoutContext, useProcessDonation } from '@lib'
import { DonationHelpLink, DonationSummary } from '@components'
import { breakpoint, typography } from '@theme'
import WalletOptions from './WalletOptions'

const PaymentCryptoConnect = () => {
  const { setDonationStage } = useContext(LayoutContext)
  const { connectWallet, isConnected, isError } = useProcessDonation()

  useEffect(() => {
    if (isConnected) {
      setDonationStage?.('processCrypto')
    }
  }, [isConnected])

  useEffect(() => {
    if (isError) {
      console.error('Error when connecting wallet')
    }
  }, [isError])

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>Connect your preferred wallet</Title>
          <DonationHelpLink />
        </div>
        <DonationSummary />
      </Information>
      {!isConnected && <WalletOptions {...{ connectWallet }} />}
    </Wrapper>
  )
}

const Information = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: copy;
`

const Title = styled.h1`
  ${typography.title.l2}
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy'
    'walletOptions';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'copy walletOptions';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }
`
export default PaymentCryptoConnect
