import React from 'react'
import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'
import { BooleanControlProps } from './'

const Checkbox = ({
  outline = false,
  required,
  label,
  data,
  handleChange,
  path,
  disabled = false,
}: BooleanControlProps) => {
  const small = false
  return (
    <Wrapper {...{ disabled, small }}>
      <Box {...{ small }}>
        <Input type="checkbox" required={!!required} onChange={_ => handleChange(path, !data)} />
        <Checkmark {...{ outline, small }} />
      </Box>
      <Label>{typeof label === 'object' ? label[0] : label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.label<{ disabled: boolean; small?: boolean }>`
  position: relative;
  display: flex;
  align-items: ${props => (props.small ? 'flex-start' : 'center')};
  padding: ${props => (props.small ? 0 : 16)}px 0;
  user-select: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.32 : 1)};

  &:hover input ~ span {
    ${rgba(palette.moon, 0.8)};
    @media (prefers-color-scheme: dark) {
      ${rgba(palette.night, 0.8)};
    }
  }

  & input:checked ~ span {
    background-color: ${rgba(palette.moon)};
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.night)};
    }

    &:after {
      transform: rotate(45deg) scale3d(1, 1, 1);
      opacity: 1;
    }
  }
`

const Box = styled.div<{ small?: boolean }>`
  flex: 0 0 auto;
  position: relative;
  width: ${props => (props.small ? '16px' : '24px')};
  height: ${props => (props.small ? '16px' : '24px')};
  margin-right: ${props => (props.small ? '8px' : '16px')};

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 32px;
    height: 32px;
    margin-right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 40px;
    height: 40px;
  }
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

const Checkmark = styled.span<{ outline: boolean; small?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${rgba(palette.moon, 0)};
  width: 100%;
  height: 100%;
  border: 1px solid ${props => (props.outline ? rgba(palette.night) : rgba(palette.moon))};
  @media (prefers-color-scheme: dark) {
    border: 1px solid ${props => (props.outline ? rgba(palette.moon) : rgba(palette.night))};
  }
  border-radius: 50%;
  ${props =>
    !props.outline &&
    `
    box-shadow: 0.5px 1px 0px rgba(0, 0, 0, 0.16);
  `}
  appearance: none;
  transition: background-color 0.25s ease-in-out;

  &:after {
    position: absolute;
    border-style: solid;
    border-color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      border-color: ${rgba(palette.moon)};
    }
    ${props =>
      props.small
        ? `
      left: calc(50% - 1px);
      top: calc(50% - 4px);
      width: 3px;
      height: 7px;
      border-width: 0 1.5px 1px 0;
    `
        : `
      left: calc(50% - 1.5px) !important;
      top: calc(50% - 3.75px) !important;
      width: 3px !important;
      height: 6px !important;
      border-width: 0 1.125px 1.125px 0 !important;
    `}
    display: block;
    transform: rotate(45deg) scale3d(0, 0, 1);
    opacity: 0;
    content: '';
    transition: opacity 0.25s ease-in-out, transform 0.6s cubic-bezier(0.44, 1.86, 0.74, 1);

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      left: calc(50% - 3px);
      top: calc(50% - 7.5px);
      width: 6px;
      height: 12px;
      border-width: 0 2.5px 2.5px 0;
    }
  }
`

const Label = styled.span`
  display: block;
  max-width: 280px;

  & a {
    position: relative;
    display: inline-flex;
    margin: 0 1px;
    color: ${rgba(palette.coral)};
    overflow: hidden;

    &::after {
      z-index: 2;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${rgba(palette.coral, 0.64)};
      width: 100%;
      height: 1px;
      transform: translate3d(-100%, 0, 0);
      transition: color 0.25s ease-in-out, transform 0.35s ease-in-out;
      content: '';
      pointer-events: none;
    }

    &:hover {
      &::after {
        transform: translate3d(0, 0, 0);
      }
    }
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 300px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 320px;
  }
`

export default Checkbox
