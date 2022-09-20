import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

interface PagePaddingProps {
  black?: boolean
  noTopPadding?: boolean
}

const PagePadding = styled.div<PagePaddingProps>`
  padding: 40px 0;
  ${props =>
    props.black &&
    `
    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.slate)};
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

  ${props => props.noTopPadding && 'padding-top: 0 !important;'}

  > * {
    max-width: calc(100vw - 48px);
    margin: auto;

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      max-width: 688px;
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      max-width: calc(100vw - 320px);
    }

    @media only screen and (min-width: 1940px) {
      max-width: 1600px;
    }
  }
`

export default PagePadding
