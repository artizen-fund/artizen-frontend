import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface BadgeProps {
  stroke?: boolean
  children?: React.ReactNode
}

const Badge = ({ children, stroke, ...props }: BadgeProps) => {
  const num = children as number
  return <Wrapper {...{ stroke, num }} {...props} />
}

const Wrapper = styled.div<
  Pick<BadgeProps, 'stroke'> & {
    num?: number
  }
>`
  position: absolute;
  right: ${props => (props.stroke ? 0 : 2)}px;
  top: ${props => (props.stroke ? 0 : 2)}px;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;

  width: 12px;
  height: 12px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 16px;
    height: 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 20px;
    height: 20px;
  }

  border: ${props => (props.stroke ? 2 : 0)}px solid;
  border-radius: 9999px;

  border-color: ${rgba(palette.white)};
  background: ${rgba(palette.uiAlert)};
  color: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    border-color: ${rgba(palette.slate)};
  }

  &:after {
    content: '${props => (!!props.num && props.num > 9 ? '!' : !!props.num && props.num > 0 ? props.num : '')}';

    color: ${rgba(palette.white)};

    font-family: 'Roc Grotesk', arial, sans-serif;
    font-style: normal;
    font-weight: 700;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.5px;
    font-size: 10px;
    line-height: 14px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      font-size: 11px;
      line-height: 16px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      font-size: 12px;
      line-height: 17px;
    }
  }
`

export default Badge
