import { JsonSchema } from '@jsonforms/core'

/*
 expMonth: parseInt('01'),
      expYear: parseInt('2025'),

      name: 'Customer 0001',
        country: 'US',
        district: 'MA',
        line1: 'Test',
        line2: '',
        city: 'Test City',
        postalCode: '11111',

*/

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
   
    creditCardNumber: {
      type: 'string',
    },
    cvv: {
      type: 'string',
      maxLength:3,
    },
    expMonth: {
      type: 'string',
      maxLength:2,
    },
    expYear: {
      type: 'string',
      maxLength:4,
    },
    name: {
      type: 'string',
    },
    country: {
      type: 'string',
      maxLength:4,
    },
    district: {
      type: 'string',
      maxLength:2,
    },
    line1: {
      type: 'string',
      
    },
    line2: {
      type: 'string',
      
    },
    city: {
      type: 'string',
      maxLength:2,
    },
    postalCode: {
      type: 'string',
      
    },

    

  },
  required: ['creditCardNumber', 'cvv', 'expMonth', 'expYear', 'name', 'country', 'district', 'line1', 'line2', 'city', 'postalCode'],
}





/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/
export interface FormState {
  creditCardNumber: string
  cvv?: string
  expMonth: string 
  expYear: string
  
}

/* This is our local initialState. */
export const initialState: FormState = {
  creditCardNumber: '',
  cvv: undefined,
  expMonth: '', 
  expYear: '',
 
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
      scope: '#/properties/cvv',
      label: 'cvv',
      
    },
    {
      type: 'Control',
      scope: '#/properties/expMonth',
      label: 'expMonth',
    },
    {
      type: 'Control',
      scope: '#/properties/expYear',
      label: 'expYear',
    },
   
    
  ],
}
