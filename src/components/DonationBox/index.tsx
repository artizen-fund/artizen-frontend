import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'
import { loggedInUserVar, LayoutContext } from '@lib'

const DonationBox = () => {
  const loggedInUser = loggedInUserVar()
  const { setVisibleModal } = useContext(LayoutContext)

  const onClick = () => (!loggedInUser ? setVisibleModal?.('login') : donate())

  const donate = () => alert('start donation')

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
