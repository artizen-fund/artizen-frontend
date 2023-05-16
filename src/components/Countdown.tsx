import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { default as ReactCountdown } from 'react-countdown'
import moment from 'moment-timezone'
import { typography } from '@theme'
import { ARTIZEN_TIMEZONE } from '@lib'

export interface CountdownProps {
  date: Partial<any>
  onComplete?: () => void
}

interface IRendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

const Countdown = ({ date, onComplete }: CountdownProps) => {
  // date is save in PST so it needs to be converted to local machine date
  const newMomentDate = moment.tz(date, ARTIZEN_TIMEZONE).local().format()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // This component wrecks havoc with testing libraries.
    // This check fixes it.
    setHasMounted(typeof jest === 'undefined')
  }, [])

  const renderer = ({ days, hours, minutes, seconds, completed }: IRendererProps) => {
    if (!!completed) {
      if (typeof window === 'undefined') return
      window.location.reload()
    }
    return completed ? (
      <span key="resetting">resetting</span>
    ) : (
      <span key={`${days}.${hours}.${minutes}.${seconds}`}>
        {days}d: {hours}h: {minutes}m
      </span>
    )
  }

  return (
    <Wrapper>{hasMounted && <ReactCountdown autoStart {...{ date: newMomentDate, renderer, onComplete }} />}</Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  ${typography.title.l4}
`

export default Countdown
