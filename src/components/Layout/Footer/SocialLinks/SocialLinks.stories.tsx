import styled from 'styled-components'
import SocialLinks from './'

const story = {
  title: 'layout/SocialLinks',
  component: SocialLinks,
}
export default story

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
