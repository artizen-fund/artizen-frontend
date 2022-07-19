import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const Confirmation = () => {
  return (
    <Wrapper>
      <h1>hey good job</h1>
      <Icon glyph="face" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px dashed ${rgba(palette.uiAlert)};
`

export default Confirmation
