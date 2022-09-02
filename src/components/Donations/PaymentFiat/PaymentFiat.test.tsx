import { MockedProvider } from '@apollo/react-testing'
import { render, act } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import { mockRefreshSessionData } from '@lib'
import { mockGetUserData } from '@gql'
import PaymentFiat from './'

enableFetchMocks()

describe('PaymentFiat', () => {
  it('renders correctly', () => {
    fetchMock.mockOnce(JSON.stringify(mockRefreshSessionData))
    const setStage = (_: string) => {
      // do nothing
    }
    const setOrder = (_: { id: string }) => {
      // do nothing
    }
    const { container } = render(
      <MockedProvider mocks={mockGetUserData} addTypename={false}>
        <PaymentFiat {...{ setStage, setOrder }} amount={42} />
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
