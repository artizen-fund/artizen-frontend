import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    number: {
      type: 'string',
    },
    verification_value: {
      type: 'string',
    },
    month: {
      type: 'string',
    },
    year: {
      type: 'string',
    },
    zip: {
      type: 'string',
    },
    phone_number: {
      type: 'string',
    },
  },
  required: ['first_name', 'last_name', 'number', 'verification_value', 'month', 'year', 'zip'],
}

export interface FormState extends Record<string, unknown> {
  first_name?: string
  last_name?: string
  number?: string
  verification_value?: string
  month?: string
  year?: string
  zip?: string
  phone_number?: string
}

export const initialState: FormState = {}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/first_name',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/last_name',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/number',
      label: 'Card Number',
      options: { unsafeToRetain: true },
    },
    {
      type: 'Control',
      scope: '#/properties/month',
      label: 'Expiration Month',
      options: { unsafeToRetain: true },
    },
    {
      type: 'Control',
      scope: '#/properties/year',
      label: 'Expiration Year',
      options: { unsafeToRetain: true },
    },
    {
      type: 'Control',
      scope: '#/properties/verification_value',
      label: 'CVV',
      options: { unsafeToRetain: true },
    },
    {
      type: 'Control',
      scope: '#/properties/zip',
      label: 'Billing Zip Code',
      options: { unsafeToRetain: true },
    },
    {
      type: 'Control',
      scope: '#/properties/phone_number',
      label: 'Phone Number',
      options: { format: 'phone' },
    },
  ],
}
