export const schema = {
  type: 'object',
  properties: {
    stringExample: {
      type: 'string',
      minLength: 3,
      description: 'Please enter your name',
    },
    stringExampleTwo: {
      type: 'string',
    },
    stringExampleThree: {
      type: 'string',
    },
    stringExampleFour: {
      type: 'string',
    },
    stringDateExample: {
      type: 'string',
      format: 'date',
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
    numberExample: {
      type: 'integer',
      description: 'Please enter your age.',
    },
  },
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
              scope: '#/properties/switchBooleanExample',
              options: {
                format: 'switch',
              },
            },
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
              scope: '#/properties/stringExampleTwo',
              label: 'Password',
              options: {
                format: 'password',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/stringExampleThree',
              label: 'Email',
              options: {
                format: 'email',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/stringExampleFour',
              label: 'URL',
              options: {
                format: 'url',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/stringDateExample',
              label: 'Date Picker',
              options: {
                format: 'date',
              },
            },
          ],
        },
      ],
    },
  ],
}

export const initialState = {
  stringExample: undefined,
  stringExampleTwo: undefined,
  stringExampleThree: undefined,
  stringExampleFour: undefined,
  stringDateExample: undefined,
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
}
