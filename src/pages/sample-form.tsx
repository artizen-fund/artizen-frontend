import type { NextPage } from 'next'
import { Form, Header } from '@components'
import { schema, uischema, initialState } from '@forms/sample'

const SampleFormPage: NextPage = () => {
  return (
    <>
      <Header />
      <Form {...{ schema, uischema }} data={initialState} />
    </>
  )
}

export default SampleFormPage
