import { css } from 'styled-components'
import { breakpoint, typeface } from '@theme'

export const typography = {
  title: {
    l1: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 800;
      font-size: 34px;
      line-height: 34px;
      @media only screen and (min-width: ${breakpoint.tablet}px) {
        font-size: 44px;
        line-height: 44px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 64px;
        line-height: 64px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 80px;
        line-height: 80px;
      }
    `,
    l2: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 28px;
      line-height: 30px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 36px;
        line-height: 36px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 40px;
        line-height: 40px;
      }
    `,
    l3: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 24px;
      line-height: 26px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 28px;
        line-height: 30px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 32px;
        line-height: 34px;
      }
    `,
    l4: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 22px;
        line-height: 24px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 24px;
        line-height: 26px;
      }
    `,
  },
  body: {
    l1: css`
      font-family: ${typeface.mackinacPro};
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 18px;
        line-height: 28px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 20px;
        line-height: 32px;
      }
    `,
    l2: css`
      font-family: ${typeface.mackinacPro};
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 16px;
        line-height: 24px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 18px;
        line-height: 28px;
      }
    `,
    l3: css`
      font-family: ${typeface.mackinacPro};
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 14px;
        line-height: 20px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 16px;
        line-height: 24px;
      }
    `,
  },
  label: {
    l0: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 16px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 17px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 18px;
      }
    `,
    l1: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 13px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 15px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 16px;
      }
    `,
    l2: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 12px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 13px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 14px;
      }
    `,
    l3: css`
      font-family: ${typeface.rocGrotesk};
      font-weight: 700;
      font-size: 10px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 11px;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        font-size: 12px;
      }
    `,
  },
}
