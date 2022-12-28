import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, typography, breakpoint } from '@theme'

export const Copy = styled.div`
  grid-area: copy;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Headline = styled.h1`
  ${typography.title.l2};
`

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin: 1em 0 2em 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    margin: 1em 0 0 0;
  }
`

export const SignInDirections = styled.p`
  ${typography.label.l1};
`

export const CheckWrapper = styled.div`
  display: contents;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    grid-area: tocCheck;
  }
`

export const Check = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    justify-content: start;
  }
  a {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`

export const CheckMessage = styled.p`
  ${typography.label.l1}
  color: ${rgba(palette.night)};
`

export const Confirmation = styled.div`
  display: none;
  grid-area: confirmation;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  h1 {
    ${typography.title.l4}
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
  }
  p {
    ${typography.label.l1}
    color: ${rgba(palette.barracuda)};
  }
  text-align: center;
`

export const Reset = styled.p`
  cursor: pointer;
  border-bottom: 2px solid ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    border-bottom: 2px solid ${rgba(palette.moon)};
  }
`
