import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    donationAmount: {
      type: 'number',
    },
  },
  required: ['donationAmount'],
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState extends Record<string, unknown> {
  donationAmount?: number
}

/* This is our local initialState. */
export const initialState: FormState = {
  donationAmount: 0.01,
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
      scope: '#/properties/donationAmount',
      label: 'Enter Your Donation (ETH)',
      options: {
        precision: 0.01,
      },
    },
  ],
}
