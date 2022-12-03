import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    person: {
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        age: {
          description: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
        shippingAddress: {
          $ref: '#/properties/address/properties/addressId',
        },
      },
      required: ['firstName', 'lastName'],
    },
    address: {
      title: 'Order',
      type: 'object',
      properties: {
        addressId: {
          type: 'string',
          label: 'Address Type',
          enum: ['Home Address 1', 'Home Address 2', 'Workplace'],
        },
        street: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
      },
    },
  },
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
      type: 'Group',
      label: 'Person',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/person/properties/firstName',
            },
            {
              type: 'Control',
              scope: '#/properties/person/properties/lastName',
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/person/properties/age',
            },
            {
              type: 'Control',
              label: 'Address',
              scope: '#/properties/person/properties/shippingAddress',
            },
          ],
        },
      ],
    },
    {
      type: 'Group',
      label: 'Address',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/person/properties/shippingAddress',
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/street',
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/city',
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/zipCode',
            },
          ],
        },
      ],
    },
  ],
}
