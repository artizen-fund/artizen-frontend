import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import { typography } from '@theme'
import moment from 'moment-timezone'

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
  console.log('date hours', hours)

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
  const newMomnetDate = moment.tz(date, 'America/Los_Angeles').local().format()

  console.log(' date  original   ', date)
  console.log('newMomnetDate  ', newMomnetDate)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // This component wrecks havoc with testing libraries.
    // This check fixes it.
    setHasMounted(typeof jest === 'undefined')
  }, [])

  return <Wrapper>{hasMounted && <ReactCountdown {...{ date: newMomnetDate, renderer, onComplete }} />}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  ${typography.title.l4}
`

export default Countdown
