import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Leaderboard, { ILeaderboard } from './'

describe('Leaderboard', () => {
  it('renders Leaderboard unchanged', () => {
    const props: ILeaderboard = {
      Donations: [],
    }
    const { container } = render(<Leaderboard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
