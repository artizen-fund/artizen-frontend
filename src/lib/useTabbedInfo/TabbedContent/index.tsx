import styled from 'styled-components'
import { kebabCase } from 'lodash'

export interface ITabbedContent {
  tabs: Array<React.ReactElement>
  activeTab?: string
}

const TabbedContent = ({ tabs, activeTab }: ITabbedContent) => (
  <Wrapper>{tabs.filter(child => kebabCase(child.props.label) === activeTab)}</Wrapper>
)

const Wrapper = styled.div``

export default TabbedContent
