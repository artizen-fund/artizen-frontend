import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import { Icon } from '@components'
import { isServer } from '@lib'

export interface CountdownProps {
  date: string
}

const Countdown = ({ date }: CountdownProps) => {
  /* note: This component causes obvious hydration errors.
   *       Utilizing useEffect to make sure the SSR and initial render are identical. */

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (isServer()) return
    setLoaded(true)
  }, [])
  return (
    <Wrapper>
      <Icon>countdown</Icon>
      {loaded && <ReactCountdown {...{ date }} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export default Countdown
