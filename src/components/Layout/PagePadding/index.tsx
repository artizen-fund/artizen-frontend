import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

interface PagePaddingProps {
  black?: boolean
}

const PagePadding = styled.div<PagePaddingProps>`
  padding: 40px 0;
  ${props =>
    props.black &&
    `
    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.slate)};
      border-top: 0.5px solid ${rgba(palette.barracuda, 0.4)};
      border-bottom: 0.5px solid ${rgba(palette.barracuda, 0.4)};
    }
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
    margin: 0 auto;

    @media only screen and (min-width: ${breakpoint.phablet}px) {
      max-width: 508px;
    }

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      max-width: 688px;
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      max-width: 944px;
    }

    @media only screen and (min-width: ${breakpoint.laptopXL}px) {
      max-width: 1200px;
    }

    @media only screen and (min-width: ${breakpoint.desktop}px) {
      max-width: 1600px;
    }
  }
`

export default PagePadding
