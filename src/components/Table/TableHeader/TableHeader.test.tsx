import { render } from '@testing-library/react'
import TableHeader from './'

it('renders TableHeader unchanged', () => {
  const { container } = render(<TableHeader>Derp</TableHeader>)
  expect(container).toMatchSnapshot()
})
