import { useState } from 'react'
import styled from 'styled-components'
import { typography, palette, breakpoint } from '@theme'
import { rgba } from '@lib'

export interface TabbedInfoProps {
  children: React.ReactElement<TabProps>[]
}

export interface TabProps {
  label: string
  children: React.ReactNode
}

const TabbedInfo = ({ children }: TabbedInfoProps) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Wrapper>
      <Tabs>
        {children.map((child, i) => (
          <Tab key={`tab-${i}`} onClick={() => setActiveTab(i)} active={i === activeTab}>
            {child.props.label}
          </Tab>
        ))}
      </Tabs>
      {children[activeTab]}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: tabbedInfo;
  p {
    margin-bottom: 1em;
  }
`

const Tabs = styled.ul`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
  margin: 40px 0px 35px 0px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin: 50px 0px 45px 0px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    margin: 60px 0px 55px 0px;
  }
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

export default TabbedInfo
