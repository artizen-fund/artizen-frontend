import { render } from '@testing-library/react'
import { SessionProvider } from '@lib'
import Header from './'

it('renders homepage unchanged', () => {
  const { container } = render(
    <SessionProvider>
      <Header />
    </SessionProvider>,
  )
  expect(container).toMatchSnapshot()
})
