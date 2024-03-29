import { JsonSchema } from '@jsonforms/core'
import { newsletter } from '@copy/common'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
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
      scope: '#/properties/EMAIL',
      label: 'Email Address',
    },
    {
      type: 'Control',
      scope: '#/properties/OPTIN',
      label: newsletter.checkbox,
      options: { inverted: true },
    },
  ],
}
