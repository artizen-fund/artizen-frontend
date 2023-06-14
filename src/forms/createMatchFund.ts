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
    goal: {
      type: 'number',
      title: 'Goal',
    },
    url: {
      type: 'string',
      minLength: 5,
      format: 'url',
      title: 'Match Fund URL',
    },
    projectRequirements: {
      type: 'string',
      minLength: 5,
      title: 'Project Requirements',
    },
  },
  required: ['name', 'goal', 'url'],
}

export interface FormState extends Record<string, unknown> {
  name?: string
  goal?: string
  url?: string
  projectRequirements?: string
}

/* This is our local initialState. */
export const initialState: FormState = {
  name: undefined,
  goal: undefined,
  url: undefined,
  projectRequirements: undefined,
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
      scope: '#/properties/goal',
    },
    {
      type: 'Control',
      scope: '#/properties/url',
    },
    {
      type: 'Control',
      scope: '#/properties/projectRequirements',
    },
  ],
}
