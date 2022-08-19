import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    FNAME: {
      type: 'string',
      minLength: 2,
    },
    LNAME: {
      type: 'string',
      minLength: 2,
    },
    EMAIL: {
      type: 'string',
      format: 'email',
    },
    OPTIN: { type: 'boolean' },
  },
  required: ['EMAIL', 'OPTIN'],
}

export interface FormState extends Record<string, unknown> {
  FNAME?: string
  LNAME?: string
  EMAIL?: string
  OPTIN?: boolean
}

export const initialState: FormState = { OPTIN: true }

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/FNAME',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/LNAME',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/EMAIL',
      label: 'Email Address',
    },
    {
      type: 'Control',
      scope: '#/properties/OPTIN',
      label: 'Opt-in to receive the Artizen newsletter.',
      options: { inverted: true },
    },
  ],
}
