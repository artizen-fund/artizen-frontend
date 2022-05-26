import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Leaderboard from './'

describe('Leaderboard', () => {
  it('renders Leaderboard unchanged', () => {
    const { container } = render(<Leaderboard />)
    expect(container).toMatchSnapshot()
  })
})
