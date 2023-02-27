import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon, NewSeasonForm } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

const CreateSeasonModal = () => {
  useEffect(() => console.log('init'), [])
  return (
    <Wrapper>
      <Headline>Create a New Season</Headline>
      <NewSeasonForm />
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
export default CreateSeasonModal
