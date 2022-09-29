import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const AvatarForm = () => {
  useEffect(() => console.log('init'), [])
  return (
    <Wrapper>
      <h1>design Avatar form here</h1>
      <Icon glyph="face" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px dashed ${rgba(palette.uiAlert)};
`

export default AvatarForm
