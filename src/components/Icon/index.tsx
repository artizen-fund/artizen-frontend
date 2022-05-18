import styled from 'styled-components'
import { breakpoint, Palette } from '@theme'
import { schemeColors } from '@lib'
import { IconKey, IconSize } from './Icon.enums'

export interface IconProps {
  children: keyof IconKey
  size?: keyof IconSize
  color?: keyof Palette
  darkColor?: keyof Palette
  solid?: boolean
}

const Icon = styled.div<IconProps>`
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  text-indent: -1000px;
  overflow: hidden;
  transition: background 0.35s ease-in-out;
  ${props =>
    schemeColors(props.color, props.darkColor, {
      background: true,
    })}
  ${props =>
    !!props.size
      ? /* if size is strictly specified, one rule for all sizes: */ `
        mask-image: url("/icons/${props.children}/${props.size}/${props.solid ? 'solid' : 'outline'}.svg");
        width: ${props.size}px;
        height: ${props.size}px;
      `
      : /* if size not specified, follow responsive rules: */ `
        mask-image: url("/icons/${props.children}/12/${props.solid ? 'solid' : 'outline'}.svg");
        width: 12px;
        height: 12px;
        
        @media only screen and (min-width: ${breakpoint.laptop}px) {
          mask-image: url("/icons/${props.children}/16/${props.solid ? 'solid' : 'outline'}.svg");
          width: 16px;
          height: 16px;
        }
        
        @media only screen and (min-width: ${breakpoint.desktop}px) {
          mask-image: url("/icons/${props.children}/20/${props.solid ? 'solid' : 'outline'}.svg");
          width: 20px;
          height: 20px;
        }
      `}
`

export default Icon
