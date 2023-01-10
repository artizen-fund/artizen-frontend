import { JsonSchema } from '@jsonforms/core'
import { ARTIZEN_CURRENT_SEASON, DEFAULT_GRANT_LENGTH_HOURS, DEFAULT_GRANT_GOAL_ETH } from '@lib'

/* This is the data schema. See JSONForms documentation for more options. */

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    grant: {
      title: 'Grant',
      type: 'object',
      properties: {
        startingDate: {
          type: 'string',
          title: 'Date of Grant',
        },
        length: {
          type: 'number',
          title: 'Grant length (hours)',
        },
        goal: {
          type: 'number',
          title: 'Goal (eth)',
        },
        season: {
          type: 'integer',
        },
      },
      required: ['season', 'goal', 'length'],
    },
    project: {
      title: 'Project',
      type: 'object',
      properties: {
        title: {
          type: 'string',
          minLength: 3,
          maxLength: 255,
        },
        logline: {
          type: 'string',
          minLength: 3,
          maxLength: 140,
        },
        impact: {
          type: 'string',
          minLength: 3,
          maxLength: 240,
        },
        impactTags: {
          type: 'string',
          maxLength: 255,
        },
        creationDate: {
          type: 'string',
          format: 'date',
        },
        completionDate: {
          type: 'string',
          format: 'date',
        },
        walletAddress: {
          type: 'string',
        },
      },
      required: ['title', 'logline', 'impact', 'impactTags', 'creationDate', 'completionDate', 'walletAddress'],
    },

    projectMembers: {
      title: 'Project Member',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 255,
          },
          lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 255,
          },
          externalLink: {
            type: 'string',
            minLength: 13,
            maxLength: 255,
            format: 'url',
          },
          email: {
            type: 'string',
            minLength: 8,
            maxLength: 255,
            format: 'email',
          },
          wallet: {
            type: 'string',
            minLength: 42,
            maxLength: 42,
          },
          type: {
            type: 'string',
          },
        },
        required: ['firstName', 'lastName', 'externalLink', 'email', 'wallet', 'type'],
      },
    },

    artifacts: {
      title: 'Artifact Assets',
      type: 'object',
      properties: {
        artworkPatron: {
          type: 'string',
          format: 'url',
        },
        videoPatron: {
          type: 'string',
          format: 'url',
        },
        artworkCreator: {
          type: 'string',
          format: 'url',
        },
        videoCreator: {
          type: 'string',
          format: 'url',
        },
        artworkCommunity: {
          type: 'string',
          format: 'url',
        },
        videoCommunity: {
          type: 'string',
          format: 'url',
        },
      },
      required: ['artworkPatron', 'artworkCreator', 'artworkCommunity'],
    },
  },
}

/*
	This is the local state that our useState() bundle will conform to. 
	All values must be optional, as an unfilled form will conform to this state.
*/

export interface Grant {
  startingDate?: string
  goal: number
  season: number
  length: number
}

export interface Artifacts {
  artworkPatron?: string
  artworkCreator?: string
  artworkCommunity?: string
  videoPatron?: string
  videoCreator?: string
  videoCommunity?: string
}

export interface Project {
  startingDate?: string
  title?: string
  logline?: string
  impact?: string
  impactTags?: string
  creationDate?: string
  completionDate?: string
  walletAddress?: string
}

export interface ProjectMember {
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
  projectMembers: Array<ProjectMember>
}

/* This is our local initialState. */
export const initialState: FormState = {
  grant: {
    startingDate: undefined,
    length: DEFAULT_GRANT_LENGTH_HOURS,
    goal: DEFAULT_GRANT_GOAL_ETH,
    season: ARTIZEN_CURRENT_SEASON,
  },
  artifacts: {
    artworkPatron: undefined,
    artworkCreator: undefined,
    artworkCommunity: undefined,
    videoPatron: undefined,
    videoCreator: undefined,
    videoCommunity: undefined,
  },
  project: {
    title: undefined,
    logline: undefined,
    impact: undefined,
    impactTags: undefined,
    creationDate: undefined,
    completionDate: undefined,
    walletAddress: undefined,
  },
  projectMembers: [
    {
      firstName: undefined,
      lastName: undefined,
      externalLink: undefined,
      email: undefined,
      wallet: undefined,
      type: 'lead',
    },
  ],
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
              scope: '#/properties/grant/properties/startingDate',
              options: {
                readonly: true,
              },
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/grant/properties/length',
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
      label: 'Project',
      elements: [
        {
          type: 'VerticalLayout',
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
                  scope: '#/properties/project/properties/impactTags',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/project/properties/logline',
                  options: {
                    format: 'text',
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/project/properties/impact',
                  options: {
                    format: 'text',
                  },
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/project/properties/creationDate',
                },
                {
                  type: 'Control',
                  scope: '#/properties/project/properties/completionDate',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/project/properties/walletAddress',
                  options: {
                    format: 'lowercase',
                  },
                },
              ],
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
          type: 'Control',
          scope: '#/properties/projectMembers',
        },
      ],
    },

    {
      type: 'Group',
      label: 'Artifact Assets',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkPatron',
              options: {
                unsafeToRetain: true,
                format: 'uploadFile',
                fileFormats: ['image/png', 'image/jpeg', 'image/gif'],
              },
            },
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkCreator',
              options: {
                unsafeToRetain: true,
                format: 'uploadFile',
                fileFormats: ['image/png', 'image/jpeg', 'image/gif'],
              },
            },

            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/artworkCommunity',
              options: {
                unsafeToRetain: true,
                format: 'uploadFile',
                fileFormats: ['image/png', 'image/jpeg', 'image/gif'],
              },
            },
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/videoPatron',
              options: {
                unsafeToRetain: true,
                format: 'uploadCloudinaryFile',
                extensions: ['mp4', 'webm'],
              },
            },

            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/videoCreator',
              options: {
                unsafeToRetain: true,
                format: 'uploadCloudinaryFile',
                extensions: ['mp4', 'webm'],
              },
            },
            {
              type: 'Control',
              scope: '#/properties/artifacts/properties/videoCommunity',
              options: {
                unsafeToRetain: true,
                format: 'uploadCloudinaryFile',
                extensions: ['mp4', 'webm'],
              },
            },
          ],
        },
      ],
    },
  ],
}
