/* Note: This form is used by Storybook and Jest tests.
 *       Do not delete.
 *       Track any changes against Storybook and tests.
 */

export const schema = {
  name: 'newsletter',
  type: 'object',
  properties: {
    FNAME: {
      type: 'string',
      minLength: 2,
    },
    LNAME: {
      type: 'string',
      minLength: 2,
    },
    EMAIL: {
      type: 'string',
      format: 'email',
    },
    OPTIN: { type: 'boolean' },
  },
  required: ['EMAIL', 'OPTIN'],
}

export interface FormState {
  FNAME?: string
  LNAME?: string
  EMAIL?: string
  OPTIN?: boolean
}

export const initialState: FormState = { OPTIN: true }

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/FNAME',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/LNAME',
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
      options: { inverted: true },
    },
  ],
}
