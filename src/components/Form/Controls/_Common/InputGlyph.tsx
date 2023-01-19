/* Optional floating icon for input[type=text/email/password], textarea, and select inputs */

import styled from 'styled-components'
import { Glyph } from '@components'
import { GlyphProps } from '../../../Glyph'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

const InputGlyph = ({ glyph, ...props }: Partial<GlyphProps>) => {
  const visible = !!glyph
  return (
    <Wrapper {...{ visible }}>
      <Glyph {...props} glyph={glyph || 'lock'} darkColor="slate" />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ visible: boolean }>`
  z-index: 2;
  position: absolute;
  right: 16px;
  top: 1px;
  height: calc(100% - 2px);
  background: linear-gradient(90deg, ${rgba(palette.stone, 0)} 0%, ${rgba(palette.stone, 1)} 100%);
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, ${rgba(palette.white, 0)} 0%, ${rgba(palette.white, 1)} 100%);
  }
  padding-left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    right: 32px;
  }

  pointer-events: none;

  transform: scale(${props => (props.visible ? 1 : 0)});
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.25s ease-in-out, transform 0.5s cubic-bezier(0.42, 0.97, 0.52, 1.49);
`

export default InputGlyph
