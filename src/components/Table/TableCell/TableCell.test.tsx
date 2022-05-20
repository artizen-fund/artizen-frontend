import { render } from '@testing-library/react'
import TableCell from './'

it('renders TableCell unchanged', () => {
  const { container } = render(<TableCell>derp</TableCell>)
  expect(container).toMatchSnapshot()
})
