import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
   
    creditCardNumber: {
      type: 'string',
      maxLength:9,
    },
    CVC: {
      type: 'string',
      maxLength:3,
    },
  },
  required: ['creditCardNumber', 'CVC'],
}



/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState {
  creditCardNumber: string
  CVC?: string
  
}

/* This is our local initialState. */
export const initialState: FormState = {
  creditCardNumber: '',
  CVC: undefined,
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
      scope: '#/properties/creditCardNumber',
      label: 'Credit card number.',
    },
    {
      type: 'Control',
      scope: '#/properties/CVC',
      label: 'CVC',
      
    },
    
  ],
}
