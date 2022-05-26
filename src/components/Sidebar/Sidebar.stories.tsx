import styled from 'styled-components'
import Sidebar from './'

export default {
  title: 'page/home/Sidebar',
  component: Sidebar,
  argTypes: {},
}

const Wrapper = styled.div`
  @media only screen and (max-width: 1199px) {
    &:before {
      content: 'note: the Sidebar is not visible on screens under 1200px';
    }
  }
`

export const SidebarComponent = (props: any) => {
  return (
    <Wrapper>
      <Sidebar {...props} />
    </Wrapper>
  )
}
