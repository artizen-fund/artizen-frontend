import { useState } from 'react'
import styled from 'styled-components'

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
      <Labels>
        {children.map((child, i) => (
          <Tab key={`tab-${i}`} onClick={() => setActiveTab(i)}>
            {child.props.label}
          </Tab>
        ))}
      </Labels>
      {children[activeTab]}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Labels = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`

const Tab = styled.div``

export default TabbedInfo
