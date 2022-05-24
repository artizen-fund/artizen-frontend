import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SocialLinks from './'

describe('SocialLinks', () => {
  it('renders Footer unchanged', () => {
    const { container } = render(<SocialLinks />)
    expect(container).toMatchSnapshot()
  })
})
