import { useEffect } from 'react'
import styled from 'styled-components'

const __name__ = () => {
  useEffect(() => console.log('init'), [])
  return <Wrapper>design __name__(sentenceCase) here</Wrapper>
}

const Wrapper = styled.div`
  border: 1px dashed red;
`

export default __name__
