import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import ProgressBar from './'

describe('ProgressBar', () => {
  it('renders ProgressBar unchanged', () => {
    const { container } = render(<ProgressBar>{50}</ProgressBar>)
    expect(container).toMatchSnapshot()
  })
})
