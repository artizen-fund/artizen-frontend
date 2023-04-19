import { JsonSchema } from '@jsonforms/core'

export const schema: JsonSchema = {
  type: 'object',
  properties: {
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
  required: ['artizenHandle', 'email'],
}

export interface FormState extends Record<string, unknown> {
  artizenHandle?: string
  email?: string
  twitterHandle?: string
  externalLink?: string
}

export interface FormStateAdmin extends FormState {
  publicAddress: string
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
        scope: '#/properties/publicAddress',
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
      publicAddress: {
        type: 'string',
        minLength: 2,
      },
    },
  },
}
