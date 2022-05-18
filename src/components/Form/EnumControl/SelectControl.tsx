import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Wrapper, InputLabel, InputWrapper, Message } from '../_Common'
import { EnumControlProps } from './'

const SelectControl = ({
  label,
  disabled = false,
  required = false,

  data,
  handleChange,
  path,
  schema,
  errors,
}: EnumControlProps) => {
  /* does Select ever have status icon? */
  const hasStatusIcon = false
  const [virgin, setVirgin] = useState(data === undefined)

  const ref = useRef<HTMLSelectElement>(null)
  const [filled, setFilled] = useState(true)
  useEffect(() => setFilled(data !== '' && data !== undefined), [data])

  const handleChangeThenBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(path, e.target.value)
    ref.current?.blur()
    // todo: make sure above doesn't malfunction in touch devices
  }

  const [parsedErrors, setParsedErrors] = useState<string[]>([])
  useEffect(() => {
    const splitErrors = errors?.split('\n').filter(e => e !== '') || []
    if (required && !data) splitErrors.push('* required field')
    setParsedErrors(splitErrors)
  }, [errors, required, data])

  const [visibleError, setVisibleError] = useState<string>()
  useEffect(() => {
    if (visibleError && parsedErrors.length < 1) {
      // wait a moment before disappearing the error so that it's visible during transition-out
      setTimeout(() => setVisibleError(undefined), 1000)
    } else {
      setVisibleError(parsedErrors[0])
    }
  }, [parsedErrors])

  return (
    <Wrapper {...{ filled, disabled }}>
      <InputWrapper {...{ hasStatusIcon }}>
        <select
          {...{ disabled, required, ref }}
          onChange={handleChangeThenBlur}
          onBlur={() => setVirgin(false)}
          defaultValue={data}
          className={!!data ? 'hasData' : 'noData'}
        >
          {schema?.enum?.map((option: string, i: number) => (
            <option value={option} key={`${path}-${i}`}>
              {option}
            </option>
          ))}
        </select>
        <DownwardArrowPlacer />
        <InputLabel className={!!data ? 'hasData' : 'noData'}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
      </InputWrapper>
      <Message {...{ virgin }} className={!!errors ? 'hasErrors' : ''}>
        {visibleError}
      </Message>
    </Wrapper>
  )
}

const DownwardArrowPlacer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &:focus-within::after {
    transform: rotate3d(0, 0, 1, 180deg);
  }

  &::after {
    position: absolute;
    top: 50%;
    bottom: 50%;
    right: 16px;
    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.moon)};
    }
    width: 10px;
    height: 6px;
    margin: auto 0;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    content: '';
    transform: rotate3d(0, 0, 1, 0deg);
    transition: transform 0.25s ease-in-out;
    will-change: transform;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    &::after {
      right: 24px;
      width: 12px;
      height: 8px;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    &::after {
      right: 32px;
    }
  }
`

export default SelectControl
