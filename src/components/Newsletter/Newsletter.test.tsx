import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Newsletter from './'

describe('Newsletter', () => {
  it('renders Newsletter unchanged', () => {
    const { container } = render(<Newsletter />)
    expect(container).toMatchSnapshot()
  })
})
