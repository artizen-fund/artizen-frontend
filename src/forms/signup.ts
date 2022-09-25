import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 2,
    },
    lastName: {
      type: 'string',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['email', 'firstName', 'lastName'],
}

export interface FormState extends Record<string, unknown> {
  email?: string
  firstName?: string
  lastName?: string
}

export const initialState: FormState = {}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
      label: 'First Name',
      options: { placeholder: 'e.g. René' },
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
      label: 'Last Name',
      options: { placeholder: 'e.g. Zellweger' },
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Email Address',
      options: { placeholder: 'e.g. rene@artizen.fund' },
    },
  ],
}
