import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconStack, Icon } from '@components'
import { breakpoint, typography } from '@theme'
import { ICourierMessage, useCourier } from '@trycourier/react-provider'
import { GET_TOP_UP_WALLET_VIA_TRANSFER_ID } from '@gql'
import { useLazyQuery } from '@apollo/client'
import { useDonation } from '@lib'

interface IProcessCrypto {
  setStage: (s: DonationStage) => void
  donationMethod: DonationMethod
  order: { id: string }
  donationAmount: number
}

type CryptoStage = 'swapping' | 'bridging' | 'building' | 'confirming' | 'complete'

const ProcessCrypto = ({ setStage, donationMethod, order }: IProcessCrypto) => {
  const [cryptoStage, setCryptoStage] = useState<CryptoStage>(donationMethod !== 'polygon' ? 'swapping' : 'building')
  const courier = useCourier()
  const [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] = useDonation()

  const [fetchTopUpWallet] = useLazyQuery(GET_TOP_UP_WALLET_VIA_TRANSFER_ID, {
    variables: {
      attr: {
        orderId: { _eq: order.id },
      },
    },
    onCompleted: async (topUpWalletData: { TopUpWallet: string | any[] }) => {
      if (topUpWalletData.TopUpWallet.length > 0) {
        const { id, amount, fee } = topUpWalletData.TopUpWallet[0]
        setCryptoStage('confirming')
        await initDonation(amount, donationMethod, fee, id)
      }
    },
  })

  const handleTopUpComplete = async () => {
    setCryptoStage('building')
    fetchTopUpWallet()
  }

  useEffect(() => {
    courier.transport.intercept((message: ICourierMessage) => {
      if (message.title === 'Payment is COMPLETE') {
        handleTopUpComplete()
      }
    })
  }, [])

  useEffect(() => {
    if (confirmingStatus === 'COMPLETE') {
      setCryptoStage('complete')
      setStage('confirmation')
    }
  }, [confirmingStatus])

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>It’s time to create your donation which requires a little extra magic</Title>
          <Subhead>
            Web3 takes longer to process transactions than traditional methods. You can keep this window open or close
            it without losing any progress – we&apos;ll send you an email when we’re ready.
          </Subhead>
        </div>

        <IconStack>
          {donationMethod !== 'polygon' && (
            <li>
              <Icon outline={cryptoStage !== 'swapping'} glyph="swap" label="12% — Exchanging to USDC (est. 2m)" />
            </li>
          )}
          {donationMethod === 'ethereum' && (
            <li>
              <Icon outline={cryptoStage !== 'bridging'} glyph="intersect" label="Bridging blockchains (est. 2m)" />
            </li>
          )}

          <li>
            <Icon outline={cryptoStage !== 'building'} glyph="refresh" label="Building your donation (est. 10m)" />
          </li>
          <li>
            <Icon outline={cryptoStage !== 'confirming'} glyph="tick" label="Confirm your donation (est. 2m)" />
          </li>
          <li>
            <Icon outline={cryptoStage !== 'complete'} glyph="party" label="Donation Complete" />
          </li>
        </IconStack>
      </Information>

      <Distractions />
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

const Subhead = styled.h2`
  ${typography.body.l2}
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy'
    'distractions';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'copy distractions';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }
`

const Distractions = styled.article`
  grid-area: distractions;
`

export default ProcessCrypto
