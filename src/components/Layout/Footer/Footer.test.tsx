import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Footer from './'

describe('Footer', () => {
  it('renders Footer unchanged', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })
})
