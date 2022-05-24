import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Layout from './'

describe('Layout', () => {
  it('renders Layout unchanged', () => {
    const { container } = render(<Layout />)
    expect(container).toMatchSnapshot()
  })
})
