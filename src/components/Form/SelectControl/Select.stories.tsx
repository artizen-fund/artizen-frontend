import { SelectControl } from './'
import { Form } from '@components'

export default {
  title: 'forms/SelectControl',
  component: SelectControl,
  argTypes: {},
}

export const SelectControlComponent = () => {
  // note: I haven't decided if it makes more sense to output the component in a form,
  //       or synthesize the necessary props

  const schema = {
    type: 'object',
    properties: {
      sampleInput: {
        type: 'string',
        enum: ['', 'first option', 'second option', 'third option'],
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
