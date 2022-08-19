import AccountButton from './'
import { MockedProvider } from '@apollo/client/testing'
import { GET_USER } from '@gql'

const story = {
  title: 'header/AccountButton',
  component: AccountButton,
  argTypes: {},
}
export default story

export const AccountButtonComponent = (props: any) => {
  const mocks = [
    {
      request: {
        query: GET_USER,
        variables: {
          issuer: 'herpderp',
        },
      },
      result: {
        data: {
          User: [{ id: '1', name: 'Rene', email: 'rene@artizen.fund' }],
        },
      },
    },
  ]
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AccountButton {...props} />)
    </MockedProvider>
  )
}
