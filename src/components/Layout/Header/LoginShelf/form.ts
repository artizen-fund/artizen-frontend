import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['email'],
}

export interface FormState {
  email?: string
}

export const initialState: FormState = {}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Email Address',
      options: { placeholder: 'e.g. rene@artizen.fund' },
    },
  ],
}
