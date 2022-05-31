/* Note: This form is used by Storybook and Jest tests.
 *       Do not delete.
 *       Track any changes against Storybook and tests.
 */

export const schema = {
  name: 'newsletter',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 2,
    },
    lastName: {
      type: 'string',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    optIn: {
      type: 'boolean',
    },
  },
  required: ['email', 'optIn'],
}

export const initialState = {
  optIn: true,
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Email Address',
    },
    {
      type: 'Control',
      scope: '#/properties/optIn',
      label: 'Opt-in to receive the Artizen newsletter.',
      options: {
        inverted: true,
      },
    },
  ],
}
