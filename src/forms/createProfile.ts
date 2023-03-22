import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
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
      minLength: 2,
    },
    artizenHandle: {
      type: 'string',
      minLength: 2,
    },
    twitterHandle: {
      type: 'string',
    },
    externalLink: {
      type: 'string',
    },
  },
  required: ['artizenHandle', 'firstName', 'lastName', 'email'],
}

export interface FormState extends Record<string, unknown> {
  artizenHandle?: string
  firstName?: string
  lastName?: string
  email?: string
  twitterHandle?: string
  externalLink?: string
}

export interface FormStateAdmin extends FormState {
  walletAddress: string
}

/*
	This is the JSONForms UI layout. 
	This will generate our labels and a default layout.
	The layout can be overridden with clever use of CSS Grid,
	  but we still need to start with this.
*/
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
      scope: '#/properties/artizenHandle',
      label: 'Choose a Username',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Enter your Email',
    },
    {
      type: 'Control',
      scope: '#/properties/twitterHandle',
      label: 'Enter your Twitter',
    },
    {
      type: 'Control',
      scope: '#/properties/externalLink',
      label: 'Enter an external link',
    },
  ],
}

export const adminUIschema = {
  ...uischema,
  ...{
    elements: [
      ...uischema.elements,
      {
        type: 'Control',
        scope: '#/properties/walletAddress',
        label: 'Enter an wallet address',
      },
    ],
  },
}

export const adminSchema = {
  ...schema,
  ...{
    // required: [...[schema.required], 'walletAddress'],
    properties: {
      ...schema.properties,
      walletAddress: {
        type: 'string',
        minLength: 2,
      },
    },
  },
}
