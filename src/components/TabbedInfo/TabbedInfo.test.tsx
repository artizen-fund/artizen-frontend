import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import styled from 'styled-components'
import TabbedInfo from './'

const Tab = styled.div<{ label: string }>``

describe('TabbedInfo', () => {
  it('renders ProgressBar unchanged', () => {
    const { container } = render(
      <TabbedInfo>
        <Tab label="About" />
        <Tab label="About" />
      </TabbedInfo>,
    )
    expect(container).toMatchSnapshot()
  })
})
