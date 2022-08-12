import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
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
      format: 'email',
    },
    bio: {
      type: 'string',
    },
    twitterLink: {
      type: 'string',
    },
    website: {
      type: 'string',
      minLength: 12,
      // TODO: format: url
    },
  },
  required: ['firstName', 'lastName', 'email'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  firstName?: string
  lastName?: string
  bio?: string
  email?: string
  twitterLink?: string
  website?: string
}

/* This is our local initialState. */
export const initialState: FormState = {}

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
      scope: '#/properties/email',
      label: 'Email',
    },
    {
      type: 'Control',
      scope: '#/properties/bio',
      label: 'Biography',
    },
    {
      type: 'Control',
      scope: '#/properties/twitterLink',
      label: 'Twitter Handle',
    },
    {
      type: 'Control',
      scope: '#/properties/website',
      label: 'Website',
    },
  ],
}
