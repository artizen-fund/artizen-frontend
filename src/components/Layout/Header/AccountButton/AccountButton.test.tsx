import { render } from '@testing-library/react'
import AccountButton from './'
import { SessionProvider } from '@lib'

it('renders AccountButton unchanged', () => {
  const { container } = render(
    <SessionProvider>
      <AccountButton>AZ</AccountButton>
    </SessionProvider>,
  )
  expect(container).toMatchSnapshot()
})
