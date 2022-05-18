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
    booleanCheckExample: {
      type: 'boolean',
    },
    miniBooleanCheckExample: {
      type: 'boolean',
    },
    booleanCheckExampleTwo: {
      type: 'boolean',
    },
    miniBooleanCheckExampleTwo: {
      type: 'boolean',
    },
    switchBooleanExample: {
      type: 'boolean',
    },
    switchBooleanExampleTwo: {
      type: 'boolean',
    },
    switchBooleanExampleThree: {
      type: 'boolean',
    },
    switchBooleanExampleFour: {
      type: 'boolean',
    },
    switchBooleanExampleFive: {
      type: 'boolean',
    },
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
  required: ['3—20 character length string'],
}

export const initialState = {
  stringExample: undefined,
  emailExample: undefined,
  booleanCheckExample: undefined,
  miniBooleanCheckExample: undefined,
  booleanCheckExampleTwo: undefined,
  miniBooleanCheckExampleTwo: undefined,
  switchBooleanExample: undefined,
  switchBooleanExampleTwo: undefined,
  switchBooleanExampleThree: undefined,
  switchBooleanExampleFour: undefined,
  switchBooleanExampleFive: undefined,
  enumExample: undefined,
  enumSegmentsExample: undefined,
  numberExample: undefined,
  integerExample: undefined,
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
      scope: '#/properties/switchBooleanExample',
      options: {
        format: 'switch',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/booleanCheckExample',
    },
    {
      type: 'Control',
      scope: '#/properties/miniBooleanCheckExample',
      options: {
        size: 'mini',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/booleanCheckExampleTwo',
      options: {
        outline: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/miniBooleanCheckExampleTwo',
      options: {
        size: 'mini',
        outline: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/enumExample',
    },
    {
      type: 'Control',
      scope: '#/properties/enumSegmentsExample',
      options: {
        format: 'segmented',
      },
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
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/switchBooleanExampleTwo',
              options: {
                format: 'switch',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/switchBooleanExampleThree',
              options: {
                format: 'switch',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/switchBooleanExampleFour',
              options: {
                format: 'switch',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/switchBooleanExampleFive',
              options: {
                format: 'switch',
              },
            },
          ],
        },
        {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/emailExample',
              options: {
                placeholder: 'your@email.com',
              },
            },
          ],
        },
      ],
    },
  ],
}
