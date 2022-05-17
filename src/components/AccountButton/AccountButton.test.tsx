import { render } from '@testing-library/react'
import AccountButton from './'

it('renders AccountButton unchanged', () => {
  const { container } = render(<AccountButton>AZ</AccountButton>)
  expect(container).toMatchSnapshot()
})
