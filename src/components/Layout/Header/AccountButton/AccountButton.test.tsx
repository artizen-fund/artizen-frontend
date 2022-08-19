import { render, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import AccountButton from './'
import { enableFetchMocks } from 'jest-fetch-mock'
import { mockRefreshSessionData } from '@lib'
import { mockGetUserData } from '@gql'

enableFetchMocks()

it('renders AccountButton unchanged', async () => {
  fetchMock.mockOnce(JSON.stringify(mockRefreshSessionData))

  const { container } = render(
    <MockedProvider mocks={mockGetUserData} addTypename={false}>
      <AccountButton />
    </MockedProvider>,
  )
  expect(container).toMatchSnapshot()

  // note: this is necessary because Jest sees the useEffect() and thinks something is going to happen
  await act(async () => {
    await Promise.resolve()
  })
})
