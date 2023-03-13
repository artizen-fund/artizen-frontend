import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon, NewSeasonForm } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

const CreateSeasonModal = () => {
  return (
    <Wrapper>
      <Headline>Create a New Season</Headline>
      <NewSeasonForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2rem;
  width: calc(100vw - 320px);
  height: 460px;
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

const Message = styled.p`
  ${typography.body.l2}
`
export default CreateSeasonModal
