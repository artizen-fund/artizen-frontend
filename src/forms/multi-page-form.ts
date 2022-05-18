export const schema = {
  name: 'multi-page-form',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
      description: 'Please enter your first name',
    },
    secondName: {
      type: 'string',
      minLength: 3,
      description: 'Please enter your second name',
    },
    vegetarian: {
      type: 'boolean',
    },
    birthDate: {
      type: 'string',
      format: 'date',
      description: 'Please enter your birth date.',
    },
    nationality: {
      type: 'string',
      enum: [undefined, 'DE', 'IT', 'JP', 'US', 'RU', 'Other'],
    },
    provideAddress: {
      type: 'boolean',
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        streetNumber: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
          maxLength: 5,
        },
      },
    },
    vegetarianOptions: {
      type: 'object',
      properties: {
        vegan: {
          type: 'boolean',
        },
        favoriteVegetable: {
          type: 'string',
          enum: [undefined, 'Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
        },
        otherFavoriteVegetable: {
          type: 'string',
        },
      },
    },
  },
}

export const initialState = {
  provideAddress: true,
  vegetarian: true,
}

export const uischema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'Step 1: Basic Information',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/firstName',
            },
            {
              type: 'Control',
              scope: '#/properties/secondName',
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/birthDate',
              label: 'Date of Birth',
            },
            {
              type: 'Control',
              scope: '#/properties/nationality',
            },
          ],
        },
        {
          type: 'Control',
          scope: '#/properties/provideAddress',
        },
        {
          type: 'Control',
          scope: '#/properties/vegetarian',
        },
      ],
    },
    {
      type: 'Category',
      label: 'Step 2: Address',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/street',
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/streetNumber',
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/city',
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/postalCode',
            },
          ],
        },
      ],
      rule: {
        effect: 'SHOW',
        condition: {
          scope: '#/properties/provideAddress',
          schema: {
            const: true,
          },
        },
      },
    },
    {
      type: 'Category',
      label: 'Step 3: Additional',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/vegetarianOptions/properties/vegan',
        },
        {
          type: 'Control',
          scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
        },
        {
          type: 'Control',
          scope: '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
              schema: {
                const: 'Other',
              },
            },
          },
        },
      ],
      rule: {
        effect: 'SHOW',
        condition: {
          scope: '#/properties/vegetarian',
          schema: {
            const: true,
          },
        },
      },
    },
  ],
  options: {
    variant: 'stepper',
    showNavButtons: true,
  },
}
