import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Metrics from './'

describe('Metrics', () => {
  it('renders Metrics unchanged', () => {
    const { container } = render(<Metrics />)
    expect(container).toMatchSnapshot()
  })
})
