import styled from 'styled-components'
import SocialLinks from './'

export default {
  title: 'layout/SocialLinks',
  component: SocialLinks,
}

const Wrapper = styled.div`
  padding: 20px;
  background: black;
`

export const SocialLinksComponent = () => {
  return (
    <Wrapper>
      <SocialLinks />
    </Wrapper>
  )
}
