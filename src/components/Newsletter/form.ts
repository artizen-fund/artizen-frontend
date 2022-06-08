/* Note: This form is used by Storybook and Jest tests.
 *       Do not delete.
 *       Track any changes against Storybook and tests.
 */

export const schema = {
  name: 'newsletter',
  type: 'object',
  properties: {
    FIRSTNAME: {
      type: 'string',
      minLength: 2,
    },
    LASTNAME: {
      type: 'string',
      minLength: 2,
    },
    EMAIL: {
      type: 'string',
      format: 'email',
    },
    OPTIN: {
      type: 'boolean',
    },
  },
  required: ['EMAIL', 'OPTIN'],
}

export const initialState = {
  OPTIN: true,
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/FIRSTNAME',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/LASTNAME',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/EMAIL',
      label: 'Email Address',
    },
    {
      type: 'Control',
      scope: '#/properties/OPTIN',
      label: 'Opt-in to receive the Artizen newsletter.',
      options: {
        inverted: true,
      },
    },
  ],
}
