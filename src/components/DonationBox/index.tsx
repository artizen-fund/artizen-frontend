import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { loggedInUserVar, LayoutContext, useGrant } from '@lib'

interface IDonationBox {
  blockchainId: string | undefined
}

const DonationBox = ({ blockchainId }: IDonationBox) => {
  const loggedInUser = loggedInUserVar()
  const { setVisibleModal } = useContext(LayoutContext)
  const { donate } = useGrant()

  const onClick = () => (!loggedInUser ? setVisibleModal?.('login') : donateFn())

  const donateFn = async () => {
    console.log('it gets here')
    if (!blockchainId || !data.donationAmount) return
    await donate(parseInt(blockchainId), data.donationAmount.toString())
  }

  const [data, setData] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(false)

  return (
    <Wrapper>
      <Form {...{ schema, uischema, initialState, data, setData, readonly }}>
        <Button {...{ onClick }}>Submit</Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
`

export default DonationBox
