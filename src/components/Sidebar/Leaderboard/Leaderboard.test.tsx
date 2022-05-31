import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Leaderboard from './'

describe('Leaderboard', () => {
  it('renders Leaderboard unchanged', () => {
    const leaderboard = [
      { name: 'herp derp', amount: 69 },
      { name: 'dorp donk', amount: 68 },
      { name: 'hoop doop', amount: 67 },
    ]
    const { container } = render(<Leaderboard {...{ leaderboard }} />)
    expect(container).toMatchSnapshot()
  })
})
