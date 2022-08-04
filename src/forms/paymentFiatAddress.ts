import { JsonSchema } from '@jsonforms/core'
import nationCodes from './nationCodes'

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
    zip: {
      type: 'string',
    },
    country: {
      type: 'string',
      enum: nationCodes.map(nation => nation.name),
    },
  },
  required: ['street1', 'city', 'state', 'zip', 'country'],
}

export interface FormState extends Record<string, unknown> {
  street1?: string
  city?: string
  state?: string
  zip?: string
  country?: string
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
      scope: '#/properties/zip',
      label: 'Billing Zip Code',
    },
    {
      type: 'Control',
      scope: '#/properties/country',
      label: 'Country',
    },
  ],
}
