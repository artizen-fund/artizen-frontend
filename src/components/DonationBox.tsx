import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { ErrorObject } from 'ajv'
import { Button, Counter } from '@components'
import {
  LayoutContext,
  useDonate,
  trackEventF,
  intercomEventEnum,
  useFullSignOut,
  WALLET_ERROR_UNSUPPORTED_OPERATION,
  WALLET_ERROR_INSUFFICIENT_FUNDS,
} from '@lib'
import { breakpoint } from '@theme'

interface IDonationBox {
  blockchainId: string | undefined
}

const DonationBox = ({ blockchainId }: IDonationBox) => {
  const { status } = useSession()
  const { disconnectAndSignout } = useFullSignOut()
  const { toggleModal } = useContext(LayoutContext)

  const { donate } = useDonate()
  const [sending, setSending] = useState<boolean>(false)
  const { setVisibleModal } = useContext(LayoutContext)
  const [artifactQuantity, setArtifactQuantity] = useState(1)

  useEffect(() => console.log(artifactQuantity), [artifactQuantity])

  const donationAmount = 0.01 // < todo: get this from Hasura

  const donateFn = async () => {
    if (!blockchainId || !artifactQuantity) return
    toggleModal('confirmTransaction')
    setSending(true)
    trackEventF(intercomEventEnum.DONATION_START, {
      amount: (artifactQuantity * donationAmount).toString(),
      grantblockchainId: blockchainId,
    })
    try {
      const returnTx = await donate(parseInt(blockchainId), (artifactQuantity * donationAmount).toString())
      // TODO: it'll only work when EK removes the transaction from the server
      // if there is transaction hash add a record
      if (!returnTx.transactionHash) {
        trackEventF(intercomEventEnum.DONATION_FAILED, {
          amount: (artifactQuantity * donationAmount).toString(),
          grantblockchainId: blockchainId,
        })
        throw new Error('Tx is empty')
      }
    } catch (e: any) {
      const errors: Array<ErrorObject> = []
      const message =
        e.code === WALLET_ERROR_INSUFFICIENT_FUNDS
          ? 'Insufficient funds'
          : WALLET_ERROR_UNSUPPORTED_OPERATION
          ? 'Connect wallet'
          : 'Unknown error'
      errors.push({
        instancePath: '/donationAmount',
        message,
        schemaPath: '#/properties/donationAmount',
        keyword: '',
        params: {},
      })

      setSending(false)

      if (e.code === WALLET_ERROR_UNSUPPORTED_OPERATION) {
        disconnectAndSignout()
      }
    }

    trackEventF(intercomEventEnum.DONATION_FINISHED, {
      amount: (artifactQuantity * donationAmount).toString(),
      grantblockchainId: blockchainId,
    })

    toggleModal('shareTransaction')

    setSending(false)
  }

  return (
    <Wrapper>
      <ScrollPoint id="donation-box" />
      {status !== 'authenticated' && <SessionMask onClick={() => setVisibleModal('login')} />}
      <>
        <Counter value={artifactQuantity} onChange={setArtifactQuantity} min={1} max={99} />
        <Button level={1} onClick={() => donateFn()} disabled={artifactQuantity <= 0 || sending}>
          {sending ? 'Processing Donation' : 'Mint'}
        </Button>
      </>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: contents;
`

const ScrollPoint = styled.div`
  position: absolute;
  left: 0;
  top: -100px;
  width: 1px;
  height: 1px;
`

const SessionMask = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

export default DonationBox
