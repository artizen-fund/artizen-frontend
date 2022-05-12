import type { NextPage } from 'next'
import { Header, Form } from '@components'
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
