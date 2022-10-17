import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { Wrapper, InputLabel, InputWrapper, Message } from '../_Common'
import { EnumControlProps } from './'

const SelectControl = ({
  label,
  enabled = true,
  processing = false,
  required = false,
  data,
  handleChange,
  path,
  schema,
  uischema,
  errors,
  ...props
}: EnumControlProps) => {
  const [virgin, setVirgin] = useState(data === undefined)

  const ref = useRef<HTMLSelectElement>(null)
  const [filled, setFilled] = useState(false)
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
  }, [visibleError, parsedErrors])

  const hasMessage = !virgin && !!errors && errors !== ''

  return (
    <Wrapper gridArea={path} {...{ filled, hasMessage }} {...props} id={uischema?.scope}>
      <InputWrapper>
        <select
          {...{ required, ref }}
          disabled={!enabled || processing}
          onChange={handleChangeThenBlur}
          onBlur={() => setVirgin(false)}
          defaultValue={data}
          placeholder={uischema?.options?.placeholder || ' '}
          className={!!data ? 'hasData' : 'noData'}
        >
          <option value={undefined} />
          {schema?.enum?.map((option: string, i: number) => (
            <option value={option} key={`${path}-${i}`}>
              {option}
            </option>
          ))}
          {schema?.oneOf?.map((option, i: number) => (
            <option value={option.const} key={`${path}-${i}`}>
              {option.title}
            </option>
          ))}
        </select>
        <DownwardArrowPlacer {...{ enabled }} />
        <InputLabel className={!!data ? 'hasData' : 'noData'}>
          {typeof label === 'object' ? label[0] : label}
          {required ? ' *' : ''}
        </InputLabel>
      </InputWrapper>
      <Message className={hasMessage ? 'hasMessage' : ''}>{visibleError}</Message>
    </Wrapper>
  )
}

const DownwardArrowPlacer = styled.div<{ enabled: boolean }>`
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
    background: ${props => rgba(palette.night, props.enabled ? 1 : 0.5)};
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
