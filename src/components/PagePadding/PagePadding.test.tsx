import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import PagePadding from './'

describe('PagePadding', () => {
  it('renders PagePadding unchanged', () => {
    const { container } = render(<PagePadding>Herp Derp</PagePadding>)
    expect(container).toMatchSnapshot()
  })
})
