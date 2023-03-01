import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import moment from 'moment-timezone'
import { typography } from '@theme'
import { ARTIZEN_TIMEZONE } from '@lib'

export interface CountdownProps {
  date: string
  onComplete: () => void
}

interface IRendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

const renderer = ({ days, hours, minutes, seconds, completed }: IRendererProps) => {
  return completed ? (
    <span>resetting</span>
  ) : (
    <span>
      {hours + days * 24}h: {minutes}m: {seconds}s
    </span>
  )
}

const Countdown = ({ date, onComplete }: CountdownProps) => {
  // date is save in PST so it needs to be converte to local machine date
  const newMomentDate = moment.tz(date, ARTIZEN_TIMEZONE).local().format()

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // This component wrecks havoc with testing libraries.
    // This check fixes it.
    setHasMounted(typeof jest === 'undefined')
  }, [])

  return <Wrapper>{hasMounted && <ReactCountdown {...{ date: newMomentDate, renderer, onComplete }} />}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  ${typography.title.l4}
`

export default Countdown
