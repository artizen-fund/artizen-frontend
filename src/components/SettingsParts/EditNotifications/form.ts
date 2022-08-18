import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    someString: {
      type: 'string',
      minLength: 2,
    },
    someEmail: {
      type: 'string',
      format: 'email',
    },
    someNumber: {
      type: 'number',
    },
    someBoolean: {
      type: 'boolean',
    },
  },
  required: ['someEmail', 'someBoolean'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  someString?: string
  someEmail?: string
  someNumber?: number
  someBoolean?: boolean
}

/* This is our local initialState. */
export const initialState: FormState = {
  someString: 'Some default value',
  someBoolean: true,
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
      scope: '#/properties/someString',
      label: 'Tell us a thing.',
    },
    {
      type: 'Control',
      scope: '#/properties/someEmail',
      label: 'Email Address',
      options: { placeholder: 'your@email.com' },
    },
    {
      type: 'Control',
      scope: '#/properties/someNumber',
      label: 'What is your lucky number?',
    },
    {
      type: 'Control',
      scope: '#/properties/someBoolean',
      label: 'Do you like to click checkmarks?',
      options: { inverted: true },
    },
  ],
}
