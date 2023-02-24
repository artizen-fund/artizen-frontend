import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    season: {
      title: 'Season',
      type: 'object',
      properties: {
        startingDate: {
          type: 'string',
          title: 'Season Starting Date',
        },
        endingDate: {
          type: 'string',
          title: 'Season Ending Date',
        },

        title: {
          type: 'string',
          title: 'Season Title',
        },
      },
      required: ['startingDate', 'endingDate', 'title'],
    },
  },
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/

export interface Season {
  startingDate: string
  endingDate: string
  title: string
}

export interface FormState extends Record<string, unknown> {
  season: Season
}

/* This is our local initialState. */
export const initialState: FormState = {
  season: {
    startingDate: '',
    endingDate: '',
    title: '',
  },
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
      type: 'Group',
      label: 'Grant',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/grant/properties/title',
            },
            {
              type: 'Control',
              scope: '#/properties/grant/properties/startingDate',
              options: {
                readonly: true,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/grant/properties/endingDate',
              options: {
                readonly: true,
              },
            },
          ],
        },
      ],
    },
  ],
}
