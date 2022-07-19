import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    cardNumber: {
      type: 'string',
    },
    cvv: {
      type: 'string',
    },
    expiresMonth: {
      type: 'string',
    },
    expiresYear: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'cardNumber', 'cvv', 'expiresMonth', 'expiresYear', 'postalCode', 'phone'],
}

export interface FormState {
  firstName?: string
  lastName?: string
  cardNumber?: string
  cvv?: string
  expiresMonth?: string
  expiresYear?: string
  postalCode?: string
  phone?: string
}

export const initialState: FormState = {}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/cardNumber',
      label: 'Card Number',
    },
    {
      type: 'Control',
      scope: '#/properties/expiresMonth',
      label: 'Expiration Month',
    },
    {
      type: 'Control',
      scope: '#/properties/expiresYear',
      label: 'Expiration Year',
    },
    {
      type: 'Control',
      scope: '#/properties/cvv',
      label: 'CVV',
    },
    {
      type: 'Control',
      scope: '#/properties/postalCode',
      label: 'Billing Zip Code',
    },
    {
      type: 'Control',
      scope: '#/properties/phone',
      label: 'Phone Number',
      options: { format: 'phone' },
    },
  ],
}
