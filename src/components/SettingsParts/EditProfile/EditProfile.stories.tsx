import { MockedProvider } from '@apollo/client/testing'
import { UPDATE_USER } from '@gql'
import EditProfile from './'

export default {
  title: 'components/EditProfile',
  component: EditProfile,
  argTypes: {},
}

export const EditProfileComponent = (props: any) => (
  <MockedProvider>
    <EditProfile {...props} />
  </MockedProvider>
)

EditProfileComponent.parameters = {
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    mocks: [
      {
        request: {
          query: UPDATE_USER,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
    ],
  },
}
