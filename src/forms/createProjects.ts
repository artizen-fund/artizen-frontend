import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
    },
    logline: {
      type: 'string',
      minLength: 20,
      maxLength: 140,
    },
    info1: {
      type: 'string',
      title: 'What are you making?',
      minLength: 100,
      maxLength: 400,
    },
    info2: {
      type: 'string',
      // eslint-disable-next-line
      title: "What's original about your project?",
      minLength: 100,
      maxLength: 400,
    },
    info3: {
      type: 'string',
      title: 'How will your project impact the world?',
      minLength: 100,
      maxLength: 400,
    },
    info4: {
      type: 'string',
      title: 'Why are you the right person to make this project?',
      minLength: 100,
      maxLength: 400,
    },
    impactTags: {
      type: 'string',
      maxLength: 255,
    },
    walletAddress: {
      type: 'string',
    },
    artworkArtifact: {
      type: 'string',
      format: 'url',
    },
    videoArtifact: {
      type: 'string',
      format: 'url',
    },
  },
  required: ['title', 'logline', 'impactTags', 'walletAddress', 'info1', 'info2', 'info3', 'info4', 'artworkArtifact'],
}

export interface FormState extends Record<string, unknown> {
  title?: string
  logline?: string
  impactTags?: string
  walletAddress?: string
  info1?: string
  info2?: string
  info3?: string
  info4?: string
  artworkArtifact?: string
  videoArtifact?: string
}

/* This is our local initialState. */
export const initialState: FormState = {
  title: undefined,
  logline: undefined,
  impactTags: undefined,
  walletAddress: undefined,
  info1: undefined,
  info2: undefined,
  info3: undefined,
  info4: undefined,
  artworkArtifact: undefined,
  videoArtifact: undefined,
}

/*
	This is the JSONForms UI layout. 
	This will generate our labels and a default layout.
	The layout can be overridden with clever use of CSS Grid,
	  but we still need to start with this.
*/

//'title', 'logline', 'impactTags', 'walletAddress', 'info1', 'info2', 'info3', 'info4'
export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/title',
    },
    {
      type: 'Control',
      scope: '#/properties/logline',
    },
    {
      type: 'Control',
      scope: '#/properties/impactTags',
    },
    {
      type: 'Control',
      scope: '#/properties/walletAddress',
    },
    {
      type: 'Control',
      scope: '#/properties/info1',
      options: {
        format: 'text',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/info2',
      options: {
        format: 'text',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/info3',
      options: {
        format: 'text',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/info4',
      options: {
        format: 'text',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/artworkArtifact',
      options: {
        unsafeToRetain: true,
        format: 'uploadFile',
        fileFormats: ['image/png', 'image/jpeg', 'image/gif'],
      },
    },
    {
      type: 'Control',
      scope: '#/properties/videoArtifact',
      options: {
        unsafeToRetain: true,
        format: 'uploadCloudinaryFile',
        extensions: ['mp4', 'webm'],
      },
    },
  ],
}
