import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

const TableAvatar = styled.div<{
  profileImage?: any
}>`
  display: inline-block;
  width: 32px;
  height: 32px;
  min-width: 32px;

  background-image: url(${props => props.profileImage || '/assets/glyphs/face/20/outline.svg'});
  background-size: ${props => (props.profileImage ? 'cover' : 'auto')};
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 9999px;
  border: 2px solid ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    border-color: ${rgba(palette.slate)};
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
  }
`

export default TableAvatar
