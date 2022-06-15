import { useState } from 'react'
import type { NextPage } from 'next'
import { Form } from '@components'
import { schema, uischema, initialState, FormState } from '@forms/sample'

const SampleFormPage: NextPage = () => {
  const [data, setData] = useState<FormState>()
  return (
    <>
      <Form {...{ schema, uischema, initialState, data, setData }} />
    </>
  )
}

export default SampleFormPage
