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
    artizenHandle: {
      type: 'string',
      minLength: 2,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    phoneNumber: {
      type: 'string',
      format: 'phone',
    },
    bio: {
      type: 'string',
    },
    website: {
      type: 'string',
      minLength: 12,
      format: 'url',
    },
    twitterHandle: {
      type: 'string',
      // todo: regex?
    },
    instagramHandle: {
      type: 'string',
      // todo: regex?
    },
    discordHandle: {
      type: 'string',
      // todo: regex?
    },
  },
  required: ['firstName', 'lastName', 'artizenHandle', 'email'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  firstName?: string
  lastName?: string
  artizenHandle?: string
  bio?: string
  email?: string
  phoneNumber?: string
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
      scope: '#/properties/artizenHandle',
      label: 'Username',
    },
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
      scope: '#/properties/phoneNumber',
      label: 'Phone Number',
    },
    {
      type: 'Control',
      scope: '#/properties/bio',
      label: 'Biography',
    },
    {
      type: 'Control',
      scope: '#/properties/website',
      label: 'Website',
    },
    {
      type: 'Control',
      scope: '#/properties/twitterHandle',
      label: 'Twitter Handle',
    },
    {
      type: 'Control',
      scope: '#/properties/instagramHandle',
      label: 'Instagram Handle',
    },
    {
      type: 'Control',
      scope: '#/properties/discordHandle',
      label: 'Discord Handle',
    },
  ],
}
