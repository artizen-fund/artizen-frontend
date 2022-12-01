import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    startDate: {
      type: 'string',
      minLength: 2,
    },
    season: {
      type: 'number',
      minLength: 1,
    },
  },
  required: ['startDate', 'season'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  startDate?: string
  type?: number
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
      scope: '#/properties/startDate',
      label: 'Start Date',
    },
    {
      type: 'Control',
      scope: '#/properties/season',
      label: 'Season',
    },
  ],
}
