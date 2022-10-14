import styled from 'styled-components'
import { Layout } from '@components'
import { typography } from '@theme'
import { textCrop } from '@lib'

const MarginTest = () => {
  return (
    <Layout>
      <Wrapper>
        <Copy>Cras mattis consectetur.</Copy>
        <Box>Derp</Box>
      </Wrapper>
      <Div>
        <Test>Cras mattis consectetur. Nulla vitae elit libero, a pharetra augue.</Test>
      </Div>
    </Layout>
  )
}

const Copy = styled.div<{ background?: string }>`
  display: block;
  ${textCrop(typography.title.l1)}
  background: ${props => props.background};
`

const Div = styled.div`
  ${textCrop(typography.title.l1, { justBox: true, noBottomCrop: true })}
`

const Test = styled.div`
  color: purple;
  ${typography.title.l1}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  background: blue;
`

const Box = styled.div`
  background: red;
`

export default MarginTest
