import React from 'react'
import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, typography, breakpoint } from '@theme'

export type BreadcrumbStep<T> = {
  key: T
  label: string
  onClick?: any
}

interface IBreadcrumbs<T> {
  breadcrumbs: Array<BreadcrumbStep<T>>
  currentStep: T
}

const Breadcrumbs = <T extends string>({ breadcrumbs, currentStep, ...props }: IBreadcrumbs<T>) => {
  return (
    <Wrapper {...props}>
      <Crumbs>
        {breadcrumbs.map((crumb, i) => (
          <Crumb
            key={crumb.key}
            active={currentStep === crumb.key}
            completed={i < breadcrumbs.findIndex(c => c.key === currentStep)}
            onClick={crumb.onClick}
            hasAction={!!crumb.onClick}
          >
            {crumb.label}
          </Crumb>
        ))}
      </Crumbs>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 35px !important;

  height: 40px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 48px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 55px;
  }

  &:after {
    content: ' ';
    position: absolute;
    right: 0;
    top: 0;
    width: 25px;
    height: 100%;
    background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    @media (prefers-color-scheme: dark) {
      background: linear-gradient(270deg, ${rgba(palette.slate, 1)} 0%, ${rgba(palette.slate, 0)} 100%);
    }
  }

  ol::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`

const Crumbs = styled.ol`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  overflow-x: scroll;

  border-bottom: 1px solid ${rgba(palette.gravel, 0.2)};
  ${typography.label.l2}
`

const Crumb = styled.li<{ active: boolean; completed: boolean; hasAction: boolean }>`
  list-style-type: decimal;
  margin-left: 25px;
  margin-right: 25px;
  ${props =>
    props.completed &&
    `
    &:after {
      content: '✔';
      color: ${rgba(palette.uiSuccess)};
      padding: 0 0 0 10px;
    }
  `}

  color: ${props => rgba(props.active ? palette.night : palette.barracuda)};
  @media (prefers-color-scheme: dark) {
    color: ${props => rgba(props.active ? palette.moon : palette.barracuda)};
  }

  transition: color 0.15s ease-in-out;
  white-space: nowrap;
  &:hover {
    ${props =>
      props.hasAction &&
      `
      cursor: pointer;
      color: ${rgba(palette.night)};
    `}
  }
`

export default Breadcrumbs
