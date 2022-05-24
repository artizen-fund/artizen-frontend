import styled from 'styled-components'
import { breakpoint, palette, Palette } from '@theme'
import { rgba } from '@lib'

interface PagePaddingProps {
  background?: keyof Palette
}

const PagePadding = styled.div<PagePaddingProps>`
  padding: 40px 0;
  ${props =>
    props.background &&
    `
    background: ${rgba(palette[props.background])};
  `}

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 48px 0;
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 64px 0;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 80px 0;
  }

  > * {
    max-width: calc(100vw - 48px);
    margin: auto;

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      max-width: 688px;
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      max-width: 944px;
    }

    @media only screen and (min-width: ${breakpoint.desktop}px) {
      max-width: 1600px;
    }
  }
`

export default PagePadding
