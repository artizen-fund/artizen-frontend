import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Sidebar from './'

describe('Sidebar', () => {
  it('renders Sidebar unchanged', () => {
    const { container } = render(<Sidebar />)
    expect(container).toMatchSnapshot()
  })
})
