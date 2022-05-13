export const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      description: 'Please enter your name',
    },
    vegetarian: {
      type: 'boolean',
    },
    vegetarianSure: {
      type: 'boolean',
    },
    carnivore: {
      type: 'boolean',
    },
    birthDate: {
      type: 'string',
      format: 'date',
    },
    nationality: {
      type: 'string',
      enum: ['', 'DE', 'IT', 'JP', 'US', 'RU', 'Other'],
    },
    iceCream: {
      type: 'string',
      enum: ['vanilla', 'chocolate', 'strawberry', 'neapolitan'],
    },
    personalData: {
      type: 'object',
      properties: {
        age: {
          type: 'integer',
          description: 'Please enter your age.',
        },
        height: {
          type: 'number',
        },
        drivingSkill: {
          type: 'number',
          maximum: 10,
          minimum: 1,
          default: 7,
        },
      },
      required: ['age', 'height'],
    },
    occupation: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
      maxLength: 5,
    },
  },
  required: ['occupation', 'nationality'],
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          scope: '#/properties/vegetarian',
        },
        {
          type: 'Control',
          scope: '#/properties/vegetarianSure',
          options: {
            format: 'checkbox',
            size: 'small',
          },
        },
        {
          type: 'Control',
          scope: '#/properties/carnivore',
          options: {
            format: 'switch',
          },
        },
        {
          type: 'Control',
          scope: '#/properties/iceCream',
          options: {
            format: 'segmented',
          },
        },
        {
          type: 'Control',
          scope: '#/properties/personalData/properties/age',
        },
        {
          type: 'Control',
          scope: '#/properties/birthDate',
        },
      ],
    },
    {
      type: 'Label',
      text: 'Additional Information',
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/personalData/properties/height',
        },
        {
          type: 'Control',
          scope: '#/properties/nationality',
        },
        {
          type: 'Control',
          scope: '#/properties/occupation',
          suggestion: [
            'Accountant',
            'Engineer',
            'Freelancer',
            'Journalism',
            'Physician',
            'Student',
            'Teacher',
            'Other',
          ],
        },
      ],
    },
  ],
}

export const initialState = {
  name: undefined,
  vegetarian: undefined,
  vegetarianSure: undefined,
  carnivore: undefined,
  birthDate: undefined,
  iceCream: undefined,
  personalData: {
    age: undefined,
  },
  postalCode: undefined,
}
