import { StringControl } from './'
import { Form } from '@components'

export default {
  title: 'forms/StringControl',
  component: StringControl,
  argTypes: {},
}

export const StringControlComponent = () => {
  // note: I haven't decided if it makes more sense to output the component in a form,
  //       or synthesize the necessary props

  const schema = {
    type: 'object',
    properties: {
      sampleInput: {
        type: 'string',
      },
    },
  }

  const uischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/sampleInput',
      },
    ],
  }

  const data = {
    sampleInput: undefined,
  }

  return <Form {...{ schema, data, uischema }} />
}
