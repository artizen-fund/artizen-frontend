import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Sidebar, { ISidebar } from './'

describe('Sidebar', () => {
  const props: ISidebar = {
    FUND_COUNT: 3.2,
    FUND_AMOUNT: 15250,
    FUND_GOAL: 25000,
    FUND_DATE: 'May, 2022',
    FUND_DEADLINE: '2022-06-30T00:00:00',
    donations: [],
  }
  it('renders Sidebar unchanged', () => {
    const { container } = render(<Sidebar {...props} />)
    expect(container).toMatchSnapshot()
  })
})
