import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { SessionProvider } from '@lib'
import Layout from './'

describe('Layout', () => {
  it('renders Layout unchanged', () => {
    const { container } = render(
      <SessionProvider>
        <Layout />
      </SessionProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})
