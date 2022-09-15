import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

export type BreadcrumbStep<T> = {
  key: T
  label: string
}

interface IBreadcrumbs<T> {
  breadcrumbs: Array<BreadcrumbStep<T>>
  currentStep: T
}

const Breadcrumbs = <T extends string>({ breadcrumbs, currentStep, ...props }: IBreadcrumbs<T>) => {
  return (
    <Wrapper {...props}>
      {breadcrumbs.map((crumb, i) => (
        <Crumb
          key={crumb.key}
          active={currentStep === crumb.key}
          completed={i < breadcrumbs.findIndex(c => c.key === currentStep)}
        >
          {crumb.label}
        </Crumb>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.ol`
  display: flex;
  flex-direction: row;
  padding-bottom: 25px;
  margin-bottom: 35px !important;
  border-bottom: 1px solid ${rgba(palette.gravel, 0.2)};
`

const Crumb = styled.li<{ active: boolean; completed: boolean }>`
  color: ${props => rgba(props.active ? palette.night : palette.barracuda)};
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
  transition: color 0.15s ease-in-out;
`

export default Breadcrumbs
