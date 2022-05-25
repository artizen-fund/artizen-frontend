import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { StickyContent, StickyCanvas } from './'

describe('StickyContent', () => {
  it('renders StickyContent unchanged', () => {
    const { container } = render(
      <StickyCanvas>
        <StickyContent>some content</StickyContent>
      </StickyCanvas>,
    )
    expect(container).toMatchSnapshot()
  })
})
