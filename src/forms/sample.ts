/* Note: This form is used by Storybook and Jest tests.
 *       Do not delete.
 *       Track any changes against Storybook and tests.
 */

export const schema = {
  name: 'artizen-sample-form',
  type: 'object',
  properties: {
    stringExample: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
    },
    emailExample: {
      label: 'email address',
      type: 'string',
      format: 'email',
    },
    phoneExample: { type: 'string' },
    booleanCheckExample: { type: 'boolean' },
    switchBooleanExample: { type: 'boolean' },
    enumExample: {
      type: 'string',
      enum: ['', 'DE', 'IT', 'JP', 'US', 'RU', 'Other'],
    },
    enumSegmentsExample: {
      type: 'string',
      enum: ['vanilla', 'chocolate', 'strawberry', 'neapolitan'],
    },
    integerExample: {
      type: 'integer',
      description: 'Please enter your age.',
      minimum: 1,
      maximum: 100,
    },
    numberExample: {
      type: 'number',
      description: 'Please enter the contents of your wallet.',
    },
  },
  required: ['stringExample'],
}

export const initialState = {
  stringExample: undefined,
  emailExample: undefined,
  phoneExample: undefined,
  booleanCheckExample: undefined,
  switchBooleanExample: undefined,
  enumExample: undefined,
  enumSegmentsExample: undefined,
  numberExample: undefined,
  integerExample: undefined,
}

export interface FormState extends Record<string, unknown> {
  stringExample?: string
  emailExample?: string
  phoneExample?: string
  booleanCheckExample?: boolean
  switchBooleanExample?: boolean
  enumExample?: string
  enumSegmentsExample?: string
  numberExample?: number
  integerExample?: number
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Label',
      text: 'Section Label',
    },
    {
      type: 'Control',
      scope: '#/properties/stringExample',
      label: '3-20 Character Length String',
    },
    {
      type: 'Control',
      scope: '#/properties/phoneExample',
      options: { format: 'phone' },
    },
    {
      type: 'Control',
      scope: '#/properties/switchBooleanExample',
      options: { format: 'switch' },
    },
    {
      type: 'Control',
      scope: '#/properties/booleanCheckExample',
    },
    {
      type: 'Control',
      scope: '#/properties/enumExample',
    },
    {
      type: 'Control',
      scope: '#/properties/enumSegmentsExample',
      options: { format: 'segmented' },
    },
    {
      type: 'Control',
      scope: '#/properties/integerExample',
    },
    {
      type: 'Control',
      scope: '#/properties/numberExample',
    },

    {
      type: 'Control',
      scope: '#/properties/emailExample',
      options: { placeholder: 'your@email.com' },
    },
  ],
}
