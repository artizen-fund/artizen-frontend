import { render } from '@testing-library/react'
import { ISubmissionFragment } from '@types'
import Submissions from './index'

// test that the Submission component renders unchanged
// pass in a prop of type Submission
// use the render function from @testing-library/react
// use the container property from the render function

const submissionsMock: Array<ISubmissionFragment> = [
  {
    id: 'submission-component-1',
    project: {
      id: '1',
      title: 'Project 1',
      logline: 'Logline 1',
      members: [
        {
          id: '1',
          type: '  ',
          user: {
            id: '1',
            createdAt: '  ',
            firstName: 'First Name 1',
            lastName: 'Last Name 1',
          },
        },
      ],
    },
    artifacts: [
      {
        id: '1',
        artwork: '  ',
        createdAt: '  ',
        description: '  ',
      },
    ],
  },
]

const { container } = render(<Submissions submissions={submissionsMock} />)

it('renders Table unchanged', () => {
  expect(container).toHaveProperty('children')
  expect(container.children).toHaveLength(1)
  expect(container.children[0]).toHaveProperty('children')
  expect(container).querySelector(`#${submissionsMock[0].id}`)
})
