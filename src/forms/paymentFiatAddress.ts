import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    street1: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    zip: {
      type: 'string',
    },
  },
  required: ['street1', 'city', 'state', 'country', 'zip'],
}

export interface FormState extends Record<string, unknown> {
  street1?: string
  city?: string
  state?: string
  country?: string
  zip?: string
}

export const initialState: FormState = {}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/street1',
      label: 'Street Address',
    },
    {
      type: 'Control',
      scope: '#/properties/city',
      label: 'City',
    },
    {
      type: 'Control',
      scope: '#/properties/state',
      label: 'State or Territory',
    },
    {
      type: 'Control',
      scope: '#/properties/country',
      label: 'Country',
    },
    {
      type: 'Control',
      scope: '#/properties/zip',
      label: 'Billing Zip Code',
      options: { unsafeToRetain: true },
    },
  ],
}
