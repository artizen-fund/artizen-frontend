import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Perks from './'

describe('Perks', () => {
  it('renders Perks unchanged', () => {
    const { container } = render(<Perks />)
    expect(container).toMatchSnapshot()
  })
})
