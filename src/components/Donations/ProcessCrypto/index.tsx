import styled from 'styled-components'
import { Button } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

interface IProcessCrypto {
  setStage: (s: DonationStage) => void
}

const ProcessCrypto = ({ setStage }: IProcessCrypto) => {
  return (
    <Wrapper>
      <h1>It’s time to create your donation which requires a little extra magic</h1>
      <p>blah blah blah</p>
      <p>insert timeline here</p>
      <Button onClick={() => setStage('confirmation')}>View Confirmation</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px dashed ${rgba(palette.uiAlert)};
`

export default ProcessCrypto
