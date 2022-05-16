import type { NextPage } from 'next'
import { Form, Header } from '@components'
import { schema, uischema, initialState } from '@forms/multi-page-form'

const MultiPageFormPage: NextPage = () => {
  return (
    <>
      <Header />
      <Form {...{ schema, uischema, initialState }} />
    </>
  )
}

export default MultiPageFormPage
