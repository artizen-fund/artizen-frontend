import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import { Glyph } from '@components'

export interface CountdownProps {
  date: string
}

const Countdown = ({ date }: CountdownProps) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(typeof jest === 'undefined'), [])
  return (
    <Wrapper>
      <Glyph glyph="countdown" />
      {hasMounted && <ReactCountdown {...{ date }} />}
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
