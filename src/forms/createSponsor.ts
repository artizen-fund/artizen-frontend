import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
    },
    url: {
      type: 'string',
      minLength: 5,
      format: 'url',
      title: 'Sponsor URL',
    },
    logotype: {
      type: 'string',
      format: 'url',
    },
    participation: {
      type: 'number',
      title: 'Initial Participation',
    },
  },
  required: ['name', 'url', 'logotype', 'participation'],
}

export interface FormState extends Record<string, unknown> {
  name?: string
  url?: string
  logotype?: string
  participation?: string
}

/* This is our local initialState. */
export const initialState: FormState = {
  name: undefined,
  url: undefined,
  logotype: undefined,
  participation: undefined,
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/url',
    },
    {
      type: 'Control',
      scope: '#/properties/logotype',
      options: {
        unsafeToRetain: true,
        format: 'uploadFile',
        fileFormats: ['image/png', 'image/jpeg', 'image/gif'],
      },
    },
    {
      type: 'Control',
      scope: '#/properties/participation',
    },
  ],
}
