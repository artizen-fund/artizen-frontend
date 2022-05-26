import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import { Icon } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface CountdownProps {
  date: string
}

const Countdown = ({ date }: CountdownProps) => (
  <Wrapper>
    <Icon>countdown</Icon>
    <ReactCountdown {...{ date }} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export default Countdown
