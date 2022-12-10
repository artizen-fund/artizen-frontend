import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { loggedInUserVar, LayoutContext, useGrant } from '@lib'
import { breakpoint } from '@theme'
import { useMutation } from '@apollo/client'
import { INSERT_DONATIONS } from '@gql'

interface IDonationBox {
  blockchainId: string | undefined
  grantId: any
}

const DonationBox = ({ blockchainId, grantId }: IDonationBox) => {
  const loggedInUser = loggedInUserVar()
  const { setVisibleModal } = useContext(LayoutContext)
  const { donate } = useGrant()
  const [insertDonation] = useMutation(INSERT_DONATIONS)

  const onClick = () => (!loggedInUser ? setVisibleModal?.('login') : donateFn())

  const donateFn = async () => {
    // console.log('it gets here', loggedInUser)
    if (!blockchainId || !data.donationAmount) return
    const returnTx = await donate(parseInt(blockchainId), data.donationAmount.toString())
    // TODO it'll only work when EK remove remve the tx from the server
    //if thre is transationhash add a record
    const tx = returnTx?.transactionHash
    if (tx) {
      await insertDonation({
        variables: {
          objects: [
            {
              txHash: tx,
              userId: loggedInUser?.id,
              grantId,
            },
          ],
        },
      })
    }
  }

  const [data, setData] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(false)

  return (
    <Wrapper>
      <Form {...{ schema, uischema, initialState, data, setData, readonly }} />
      <Button {...{ onClick }} disabled={!data.donationAmount || data.donationAmount <= 0}>
        Donate
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
    flex-direction: row;
  }
`

export default DonationBox
