import { MockedProvider } from '@apollo/react-testing'
import { render, act } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import { mockRefreshSessionData } from '@lib'
import { mockGetUserData } from '@gql'
import SessionShelf from './'

enableFetchMocks()

describe('SessionShelf', () => {
  it('renders correctly', async () => {
    fetchMock.mockOnce(JSON.stringify(mockRefreshSessionData))
    const { container } = render(
      <MockedProvider mocks={mockGetUserData} addTypename={false}>
        <SessionShelf />
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
