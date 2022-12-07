import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
//  properties
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    grant: {
      title: 'Grant',
      type: 'object',
      properties: {
        date: {
          type: 'string',
          format: 'date',
        },
        goal: {
          type: 'integer',
        },
        season: {
          type: 'integer',
        },
      },
      required: ['date', 'season', 'goal'],
    },
    artifacts: {
      title: 'Artifacts Assets',
      type: 'object',
      properties: {
        artworkPatron: {
          type: 'string',
        },
        videoPatron: {
          type: 'string',
        },
        artworkCreator: {
          type: 'string',
        },
        videoCreator: {
          type: 'string',
        },
        artworkCommunity: {
          type: 'string',
        },
        videoCommunity: {
          type: 'string',
        },
      },
      required: ['artworkPatron', 'artworkCreator', 'artworkCommunity'],
    },
    project: {
      title: 'Project',
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        longline: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        impact: {
          type: 'string',
        },
        // impactTags: {
        //   type: 'string',
        // },
        creationDate: {
          type: 'string',
          format: 'date',
          description: 'schema-based time picker',
        },
        completionDate: {
          type: 'string',
          format: 'date',
        },
        walletAddress: {
          type: 'string',
        },
      },
      required: [
        'title',
        'longline',
        'description',
        'impact',
        // 'impactTags',
        'creationDate',
        'completionDate',
        'walletAddress',
      ],
    },
    projectMembers: {
      title: 'Project',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        externalLink: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        wallet: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
      required: ['firstName', 'lastName', 'externalLink', 'email', 'wallet', 'type'],
    },
  },
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/

export interface Grant {
  date: string
  goal: number
  season: number
}

export interface Artifacts {
  artworkPatron?: string
  artworkCreator?: string
  artworkCommunity?: string
  videoPatron?: string
  videCreator?: string
  videoCommunity?: string
}

export interface Project {
  title?: string
  longline?: string
  description?: string
  impact?: string
  creationDate?: string
  completionDate?: string
  walletAddress?: string
}

export interface ProjectMembers {
  firstName?: string
  lastName?: string
  externalLink?: string
  email?: string
  wallet?: string
  type?: string
}

export interface FormState extends Record<string, unknown> {
  grant: Grant
  artifacts: Artifacts
  project: Project
  projectMembers: ProjectMembers
}

/* This is our local initialState. */
export const initialState: FormState = {
  grant: {
    date: '',
    goal: 0,
    season: 0,
  },
  artifacts: {
    artworkPatron: undefined,
    artworkCreator: undefined,
    artworkCommunity: undefined,
    videoPatron: undefined,
    videCreator: undefined,
    videoCommunity: undefined,
  },
  project: {
    title: undefined,
    longline: undefined,
    description: undefined,
    impact: undefined,
    creationDate: undefined,
    completionDate: undefined,
    walletAddress: undefined,
  },
  projectMembers: {
    firstName: undefined,
    lastName: undefined,
    externalLink: undefined,
    email: undefined,
    wallet: undefined,
    type: undefined,
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
              scope: '#/properties/grant/properties/date',
              label: 'Date, format: 2022-12-03',
            },
            {
              type: 'Control',
              scope: '#/properties/grant/properties/goal',
            },
            {
              type: 'Control',
              scope: '#/properties/grant/properties/season',
            },
          ],
        },
      ],
    },
    {
      type: 'Group',
      label: 'Artifacts Assets',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkPatron',
              options: { format: 'uploadFile' },
            },
            // {
            //   type: 'Control',
            //   scope: '#/properties/artifacts/properties/videoPatron',
            //   options: { format: 'uploadFile' },
            // },
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkCreator',
              options: { unsafeToRetain: true, format: 'uploadFile' },
            },
            // {
            //   type: 'Control',
            //   scope: '#/properties/artifacts/properties/videoCreator',
            //   options: { unsafeToRetain: true, format: 'uploadFile' },
            // },
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkCommunity',
              options: { unsafeToRetain: true, format: 'uploadFile' },
            },
            // {
            //   type: 'Control',
            //   scope: '#/properties/artifacts/properties/videoCommunity',
            //   options: { unsafeToRetain: true, format: 'uploadFile' },
            // },
          ],
        },
      ],
    },
    {
      type: 'Group',
      label: 'Project',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/project/properties/title',
            },
            {
              type: 'Control',
              scope: '#/properties/project/properties/longline',
            },
            {
              type: 'Control',
              scope: '#/properties/project/properties/description',
            },
            {
              type: 'Control',
              scope: '#/properties/project/properties/impact',
            },
            // {
            //   type: 'Control',
            //   scope: '#/properties/project/properties/impactTags',
            // },
            {
              type: 'Control',
              scope: '#/properties/project/properties/creationDate',
            },
            {
              type: 'Control',
              scope: '#/properties/project/properties/completionDate',
            },
            {
              type: 'Control',
              scope: '#/properties/project/properties/walletAddress',
            },
          ],
        },
      ],
    },
    {
      type: 'Group',
      label: 'Project Members',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/firstName',
            },
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/lastName',
            },
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/externalLink',
            },
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/email',
            },
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/wallet',
            },
            {
              type: 'Control',
              scope: '#/properties/projectMembers/properties/type',
            },
          ],
        },
      ],
    },
  ],
}
