import { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Button } from '@components'
import { schema, uischema, initialState, FormState } from './form'

const __name__ = () => {
  const LOCALSTORAGE_KEY = '__name__(lowerCase)'

  /* set up initialState of form, including previously recorded
   * responses from browser localStorage */
  const [data, setData] = useState<FormState>(initialState)
  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  // component state data
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

export default __name__
