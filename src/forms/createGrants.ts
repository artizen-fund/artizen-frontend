import { JsonSchema } from '@jsonforms/core'

/* This is the data schema. See JSONForms documentation for more options. */
export const schema: JsonSchema = {
  type: 'object',
  properties: {
    // grant: {
    //   title: 'Grant',
    //   type: 'object',
    //   properties: {
    //     date: {
    //       type: 'string',
    //       format: 'date',
    //     },
    //     season: {
    //       type: 'integer',
    //     },
    //   },
    //   required: ['date', 'season'],
    // },
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
    // project: {
    //   title: 'Project',
    //   type: 'object',
    //   properties: {
    //     title: {
    //       type: 'string',
    //     },
    //     longline: {
    //       type: 'string',
    //     },
    //     description: {
    //       type: 'string',
    //     },
    //     impact: {
    //       type: 'string',
    //     },
    //     impactTags: {
    //       type: 'string',
    //     },
    //     creationDate: {
    //       type: 'string',
    //       format: 'date',
    //       description: 'schema-based time picker',
    //     },
    //     completitionDate: {
    //       type: 'string',
    //       format: 'date',
    //     },
    //     wallet: {
    //       type: 'string',
    //     },
    //   },
    //   required: [
    //     'title',
    //     'longline',
    //     'description',
    //     'impact',
    //     'impactTags',
    //     'creationDate',
    //     'completitionDate',
    //     'wallet',
    //   ],
    // },
    // projectMembers: {
    //   title: 'Project',
    //   type: 'object',
    //   properties: {
    //     firstName: {
    //       type: 'string',
    //     },
    //     lastName: {
    //       type: 'string',
    //     },
    //     externalLink: {
    //       type: 'string',
    //     },
    //     email: {
    //       type: 'string',
    //     },
    //     wallet: {
    //       type: 'string',
    //     },
    //     type: {
    //       type: 'string',
    //     },
    //   },
    //   required: ['firstName', 'lastName', 'externalLink', 'email', 'wallet', 'type'],
    // },
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
    // {
    //   type: 'Group',
    //   label: 'Grant',
    //   elements: [
    //     {
    //       type: 'HorizontalLayout',
    //       elements: [
    //         {
    //           type: 'Control',
    //           scope: '#/properties/grant/properties/date',
    //           label: 'Date, format: 2022-12-03',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/grant/properties/season',
    //         },
    //       ],
    //     },
    //   ],
    // },
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
    // {
    //   type: 'Group',
    //   label: 'Project',
    //   elements: [
    //     {
    //       type: 'HorizontalLayout',
    //       elements: [
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/title',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/longline',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/description',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/impact',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/impactTags',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/creationDate',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/completitionDate',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/project/properties/wallet',
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: 'Group',
    //   label: 'Project Members',
    //   elements: [
    //     {
    //       type: 'HorizontalLayout',
    //       elements: [
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/firstName',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/lastName',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/externalLink',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/email',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/wallet',
    //         },
    //         {
    //           type: 'Control',
    //           scope: '#/properties/projectMembers/properties/type',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
}
