import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { ErrorObject } from 'ajv'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/donation'
import {
  LayoutContext,
  useGrant,
  trackEventF,
  intercomEventEnum,
  MINIMUM_DONATION_AMOUNT,
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

  const { donate } = useGrant()
  const [sending, setSending] = useState<boolean>(false)
  const { setVisibleModal } = useContext(LayoutContext)
  const [data, setData] = useState<FormState>(initialState)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  useEffect(() => {
    const errors: Array<ErrorObject> = []
    if (!data.donationAmount || data.donationAmount < MINIMUM_DONATION_AMOUNT) {
      errors.push({
        instancePath: '/donationAmount',
        message: `Minimum donation is ${MINIMUM_DONATION_AMOUNT} ETH`,
        schemaPath: '#/properties/donationAmount',
        keyword: '',
        params: {},
      })
    }
    setAdditionalErrors(errors)
  }, [data])

  const donateFn = async () => {
    if (!blockchainId || !data.donationAmount) return
    if (data.donationAmount < MINIMUM_DONATION_AMOUNT) {
      // under minimum
      return
    }
    setSending(true)
    trackEventF(intercomEventEnum.DONATION_START, {
      amount: data.donationAmount.toString(),
      grantblockchainId: blockchainId,
    })
    try {
      const returnTx = await donate(parseInt(blockchainId), data.donationAmount.toString())
      // TODO: it'll only work when EK removes the transaction from the server
      // if there is transaction hash add a record
      if (!returnTx.transactionHash) {
        trackEventF(intercomEventEnum.DONATION_FAILED, {
          amount: data.donationAmount.toString(),
          grantblockchainId: blockchainId,
        })
        throw new Error('Tx is empty')
      }
    } catch (e: any) {
      const errors: Array<ErrorObject> = []
      console.log('TX error code', e.code)

      console.log('WALLET_ERROR_UNSUPPORTED_OPERATION  ', WALLET_ERROR_UNSUPPORTED_OPERATION)
      console.log('e.code  ', e.code === WALLET_ERROR_UNSUPPORTED_OPERATION)

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

      setAdditionalErrors(errors)
      setSending(false)

      if (e.code === WALLET_ERROR_UNSUPPORTED_OPERATION) {
        disconnectAndSignout()
      }
    }

    trackEventF(intercomEventEnum.DONATION_FINISHED, {
      amount: data.donationAmount.toString(),
      grantblockchainId: blockchainId,
    })

    setSending(false)
  }

  return (
    <Wrapper>
      <ScrollPoint id="donation-box" />
      {status !== 'authenticated' && <SessionMask onClick={() => setVisibleModal?.('login')} />}
      <>
        <Form {...{ schema, uischema, initialState, data, setData, additionalErrors }} readonly={sending}>
          <Button
            level={0}
            onClick={() => donateFn()}
            disabled={!data.donationAmount || data.donationAmount <= 0 || sending}
            stretch
          >
            {sending ? 'Processing Donation' : 'Donate'}
          </Button>
        </Form>
      </>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
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
