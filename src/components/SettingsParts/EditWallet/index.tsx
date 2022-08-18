import { useState } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { useFormLocalStorage } from '@lib'
import { schema, uischema, initialState, FormState } from './form'

const EditWallet = () => {
  const LOCALSTORAGE_KEY = 'editWallet'

  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const [readonly, setReadonly] = useState(false)

  const submit = () => {
    // const response = await someService.submit(data)
  }

  return (
    <Wrapper>
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <Button onClick={() => submit()}>Submit</Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default EditWallet
