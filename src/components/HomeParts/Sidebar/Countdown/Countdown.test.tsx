import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Countdown from './'

describe('Countdown', () => {
  it('renders Countdown unchanged', () => {
    const { container } = render(<Countdown date="2022-06-30T00:00:00" />)
    expect(container).toMatchSnapshot()
  })
})
