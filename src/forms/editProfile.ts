import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    artizenHandle: {
      type: 'string',
      minLength: 2,
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
  required: ['artizenHandle'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  artizenHandle?: string
  bio?: string
  website?: string
  twitterHandle?: string
  instagramHandle?: string
  discordHandle?: string
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
      scope: '#/properties/bio',
      label: 'Bio',
      options: {
        format: 'text',
      },
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
