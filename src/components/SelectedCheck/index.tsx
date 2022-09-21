import { useEffect } from 'react'
import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

interface ISelected {
  selected?: boolean
}

const SelectedCheck = ({ selected }: ISelected) => (
  <Wrapper {...{ selected }}>
    <Glyph glyph="tick" color="white" darkColor="night" level={2} />
  </Wrapper>
)

const Wrapper = styled.div<ISelected>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;

  @media only string and (min-width: ${breakpoint.laptop}px) {
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
  }

  @media only string and (min-width: ${breakpoint.desktop}px) {
    top: -12px;
    right: -12px;
    width: 40px;
    height: 40px;
  }

  background: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon)};
  }
  border-radius: 9999px;

  transform: scale(${props => (props.selected ? 1 : 0)});
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

export default SelectedCheck
