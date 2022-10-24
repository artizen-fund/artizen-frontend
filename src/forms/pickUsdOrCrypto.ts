import { JsonSchema } from '@jsonforms/core'

export type TileOption = {
  const?: 'usd' | 'crypto'
  title: string
  subtitle?: string
  icon: string
}

const usdOrUnknown: Array<TileOption> = [
  { const: 'usd', title: 'Credit Card', icon: 'creditCard' },
  { const: 'crypto', title: 'Crypto', icon: 'wallet' },
]

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    donationMethod: {
      type: 'string',
      oneOf: usdOrUnknown,
    },
  },
  required: ['donationMethod'],
}

export interface FormState extends Record<string, unknown> {
  donationMethod?: string
}

export const initialState: FormState = {
  donationMethod: 'usd',
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/donationMethod',
      label: 'Donation Method',
      options: { format: 'tile' },
    },
  ],
}
