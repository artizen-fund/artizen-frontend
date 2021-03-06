import { useState } from 'react'
import { Form } from '@components'
import { schema, uischema, initialState } from '@forms/sample'

const story = {
  title: 'forms/Form',
  component: Form,
  argTypes: {},
}
export default story

export const FormComponent = () => {
  // note: I haven't decided if it makes more sense to output the component in a form,
  //       or synthesize the necessary props
  const [data, setData] = useState<any>()
  return <Form {...{ schema, uischema, initialState, data, setData }} />
}
