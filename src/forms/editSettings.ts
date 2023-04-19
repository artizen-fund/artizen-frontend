import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    artizenHandle: {
      type: 'string',
      minLength: 2,
    },

    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['artizenHandle', 'email'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  artizenHandle?: string
  email?: string
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
      label: 'handle',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      label: 'Email',
    },
  ],
}
