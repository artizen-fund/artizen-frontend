import { JsonSchema } from '@jsonforms/core'
import { nations, americanRegions } from '@lib'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    street1: {
      type: 'string',
      minLength: 4,
    },
    city: {
      type: 'string',
      minLength: 3,
    },
    state: {
      type: 'string',
      enum: americanRegions.map(val => val.const),
    },
    zip: {
      type: 'string',
      minLength: 4,
    },
    country: {
      type: 'string',
      enum: nations.map(val => val.const),
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
      label: 'Postal Code',
    },
    {
      type: 'Control',
      scope: '#/properties/country',
      label: 'Country',
    },
  ],
}
