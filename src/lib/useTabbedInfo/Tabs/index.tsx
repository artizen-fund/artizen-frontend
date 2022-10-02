import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import { kebabCase } from 'lodash'

export interface ITabs {
  tabs: Array<React.ReactElement>
  activeTab?: string
  setTab: (tabName: string) => void
}

const Tabs = ({ tabs, activeTab, setTab, ...props }: ITabs) => (
  <Wrapper {...props}>
    {tabs.map((child, index) => (
      <Tab
        key={`tab-${index}`}
        onClick={() => setTab(kebabCase(child.props.label))}
        active={(!activeTab && index === 0) || activeTab === kebabCase(child.props.label)}
      >
        {child.props.label}
      </Tab>
    ))}
  </Wrapper>
)

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
`

const Tab = styled.div<{ active: boolean }>`
  ${typography.label.l1}
  color: ${rgba(palette.night)};
  border-bottom: 2px solid ${rgba(palette.night, 0)};
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  &:hover {
    border-color: ${rgba(palette.night, 1)};
  }
  ${props =>
    props.active &&
    `
    color: ${rgba(palette.black)};
    border-color: ${rgba(palette.black, 1)};
  `}
`

export default Tabs
