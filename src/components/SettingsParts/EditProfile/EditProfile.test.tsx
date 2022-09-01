import renderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { UPDATE_USER_PROFILE } from '@gql'
import EditProfile from './'

describe('EditProfile', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockedProvider>
          <EditProfile />
        </MockedProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
