import { render } from '@testing-library/react'
import Table from './'

it('renders Table unchanged', () => {
  const { container } = render(<Table />)
  expect(container).toMatchSnapshot()
})
