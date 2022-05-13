import { Form } from '@components'
import { schema, uischema, initialState } from '@forms/sample'

export default {
  title: 'forms/Form',
  component: Form,
  argTypes: {},
}

export const FormComponent = () => {
  // note: I haven't decided if it makes more sense to output the component in a form,
  //       or synthesize the necessary props

  return <Form {...{ schema, uischema }} data={initialState} />
}
