import { JsonSchema } from '@jsonforms/core'

export type TileOption = {
  const?: DonationMethod
  title: string
  icon: string
}

const polygonOrEthereum: Array<TileOption> = [
  { const: 'polygon', title: 'Polygon', icon: 'polygon' },
  { const: 'ethereum', title: 'Ethereum', icon: 'ethereum' },
]

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    donationMethod: {
      type: 'string',
      oneOf: polygonOrEthereum,
    },
  },
  required: ['donationMethod'],
}

export interface FormState extends Record<string, unknown> {
  donationMethod?: string
}

export const initialState: FormState = {
  donationMethod: 'polygon',
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
