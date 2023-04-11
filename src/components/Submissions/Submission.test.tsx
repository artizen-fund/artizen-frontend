import { render } from '@testing-library/react'
import { ISubmissionFragment } from '@types'
import Submissions from './index'

// test that the Submission component renders unchanged
// pass in a prop of type Submission
// use the render function from @testing-library/react
// use the container property from the render function

const mockProject = {
  __typename: 'Projects',
  id: 'abc123',
  impact: 'test impact string',
  impactTags: `['tag1', 'tag2', 'tag3']`,
  titleURL: 'test-title-url',
  logline: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  creationDate: '2022-01-01 00:00:00',
  completionDate: '2022-01-02 00:00:00',
  submissions: [{ id: 'abc123', __typename: 'Submissions' }],
  walletAddress: '0x00000000000',
  title: 'Test Project',
  artifacts: [
    {
      __typename: 'Artifacts',
      id: 'id',
      name: 'name',
      description: 'description',
      artwork: 'artwork',
      video: 'video',
      edition: 'edition',
      blockchainAddress: 'blockchainAddress',
      dateMinting: 'dateMinting',
      token: 'token',
      createdAt: 'createdAt',
      openEditionCopies_aggregate: {
        aggregate: {
          sum: {
            copies: 1,
          },
        },
      },
    },
  ],
  members: [
    {
      __typename: 'ProjectMembers',
      id: 'abc234',
      type: 'lead',
      user: {
        __typename: 'Users',
        createdAt: '',
        id: 'abc345',
        firstName: 'Herp',
        lastName: 'Derp',
        artizenHandle: 'herpderp',
        twitterHandle: 'derpherp',
        website: 'https://derp.com',
        profileImage: undefined,
        publicAddress: 'null',
        claimed: false,
      },
    },
  ],
}

// const submissionsMock: Array<ISubmissionFragment> = [
//   {
//     id: 'submission-component-1',
//     ...mockProject
//   },
// ]

// const { container } = render(<Submissions submissions={submissionsMock} />)

// it('renders Table unchanged', () => {
//   expect(container).toHaveProperty('children')
//   expect(container.children).toHaveLength(1)
//   expect(container.children[0]).toHaveProperty('children')
//   expect(container).querySelector(`#${submissionsMock[0].id}`)
// })
