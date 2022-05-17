import { render } from '@testing-library/react'
import Spinner from './'

it('renders Spinner unchanged', () => {
  const { container } = render(<Spinner />)
  expect(container).toMatchSnapshot()
})
