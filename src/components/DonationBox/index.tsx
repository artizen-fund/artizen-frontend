import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { loggedInUserVar, LayoutContext, useGrant } from '@lib'
import { breakpoint } from '@theme'
import { useMutation } from '@apollo/client'
import { INSERT_DONATIONS, UPDATE_DONATIONS } from '@gql'
import { alternatingPanels } from '@copy/home'

interface IDonationBox {
  blockchainId: string | undefined
  grantId: string | undefined
  updatefn: any
}

const DonationBox = ({ blockchainId, grantId, updatefn }: IDonationBox) => {
  const loggedInUser = loggedInUserVar()
  const [insertDonation] = useMutation(INSERT_DONATIONS)
  const [updateDonation] = useMutation(UPDATE_DONATIONS)
  const { donate } = useGrant()
  const [readonly, setReadonly] = useState(false)
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const { setVisibleModal } = useContext(LayoutContext)
  const [data, setData] = useState<FormState>(initialState)

  const onClick = () => (!loggedInUser ? setVisibleModal?.('login') : donateFn())

  const donateFn = async () => {
    if (!blockchainId || !data.donationAmount) return
    setSending(true)
    const returnTx = await donate(parseInt(blockchainId), data.donationAmount.toString())
    // TODO it'll only work when EK remove remve the tx from the server
    //if thre is transationhash add a record
    const tx = returnTx?.transactionHash
    if (!tx) {
      return
    }

    try {
      await insertDonation({
        variables: {
          objects: [
            {
              txHash: tx,
              userId: loggedInUser?.id,
              amount: +data.donationAmount,
              grantId,
            },
          ],
        },
      })
    } catch (error) {
      //updateDonation
      await updateDonation({
        variables: {
          _set: {
            grantId,
            amount: +data.donationAmount,
            userId: loggedInUser?.id,
          },
          where: {
            txHash: { _eq: tx },
          },
        },
      })
    }

    setSending(false)
    updatefn(true)

    alert('donation complete')
  }

  return (
    <Wrapper>
      <Form {...{ schema, uischema, initialState, data, setData, readonly }}></Form>
      <Button {...{ onClick }} disabled={!data.donationAmount || data.donationAmount <= 0} stretch>
        {sending ? 'Sending' : 'Donate'}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

export default DonationBox
