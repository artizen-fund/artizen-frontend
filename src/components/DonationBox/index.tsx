import { useState, useContext } from 'react'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/donation'
import { LayoutContext, useGrant } from '@lib'
import { breakpoint } from '@theme'

interface IDonationBox {
  blockchainId: string | undefined
  grantId: string | undefined
}

// TODO: Ruben, is grantId still needed here?
const DonationBox = ({ blockchainId, grantId }: IDonationBox) => {
  const { status } = useSession()

  const { donate } = useGrant()
  const [readonly, setReadonly] = useState(false)
  const [sending, setSending] = useState<boolean>(false)
  // const [error, setError] = useState<string>()
  const { setVisibleModal } = useContext(LayoutContext)
  const [data, setData] = useState<FormState>(initialState)

  const donateFn = async () => {
    if (!blockchainId || !data.donationAmount) return
    setSending(true)
    const returnTx = await donate(parseInt(blockchainId), data.donationAmount.toString())
    // TODO: it'll only work when EK removes the transaction from the server
    // if there is transaction hash add a record
    const tx = returnTx?.transactionHash
    if (!tx) {
      throw new Error('Tx is empty')
    }

    setSending(false)
    alert('donation complete')
  }

  return (
    <Wrapper>
      {status !== 'authenticated' && <SessionMask onClick={() => setVisibleModal?.('login')} />}
      <>
        <Form {...{ schema, uischema, initialState, data, setData, readonly }}></Form>
        <Button
          level={0}
          onClick={() => donateFn()}
          disabled={!data.donationAmount || data.donationAmount <= 0}
          stretch
        >
          {sending ? 'Sending' : 'Donate'}
        </Button>
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
