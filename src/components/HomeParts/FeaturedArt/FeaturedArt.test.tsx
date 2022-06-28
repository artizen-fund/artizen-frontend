import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import FeaturedArt from './'

describe('FeaturedArt', () => {
  it('renders FeaturedArt unchanged', () => {
    const { container } = render(<FeaturedArt tokenId={1} startDate={new Date()} tagName="Tag Name" />)
    expect(container).toMatchSnapshot()
  })
})
