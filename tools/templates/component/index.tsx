import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const __name__ = () => {
  useEffect(() => console.log('init'), [])
  return (
    <Wrapper>
      <h1>design __name__(sentenceCase) here</h1>
      <Icon>face</Icon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px dashed ${rgba(palette.uiAlert)};
`

export default __name__
