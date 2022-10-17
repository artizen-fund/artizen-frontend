import { JsonSchema, RuleEffect, Condition } from '@jsonforms/core'
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
      oneOf: americanRegions,
    },
    zip: {
      type: 'string',
      minLength: 4,
    },
    country: {
      type: 'string',
      oneOf: nations,
    },
  },
  required: ['street1', 'city', 'zip', 'country'],
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
      rule: {
        effect: RuleEffect.ENABLE,
        condition: {
          scope: '#/properties/country',
          schema: { enum: ['US'] },
        } as Condition,
      },
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
