import { useContext } from 'react'
import styled from 'styled-components'
import { Icon, NewSeasonForm } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'

const SubmitProjectModal = () => {
  const { modalAttrs } = useContext(LayoutContext)
  console.log('modalAttrs', modalAttrs)

  const { projectId } = modalAttrs
  return (
    <Wrapper>
      <Headline>Submit Project to Season</Headline>
      <Message>{`project Id to be Submitted: ${projectId}`}</Message>
      <div>Season to be added</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  padding: 2rem;
  width: calc(100vw - 320px);
  height: calc(100vh - 320px);
`

const Headline = styled.h1`
  ${typography.title.l3}
`

const Message = styled.p`
  ${typography.body.l2}
`
export default SubmitProjectModal
