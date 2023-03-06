import React from 'react'
import styled from 'styled-components'
import { palette, typography } from '@theme'
import { ISubmissionFragment } from '@types'

export default function Submission({ project }: ISubmissionFragment): JSX.Element {
  return (
    <StyledSubmission id="submission-component">
      <Item test-id={`project.title-${project?.title}`}>{project?.title}</Item>
      <Item test-id={`project.title-${project?.logline}`}>{project?.logline}</Item>
    </StyledSubmission>
  )
}
// create a styled component called StyledSubmission
// style the component using styled components

const Item = styled.h2`
  ${typography.label.l3}
`

const StyledSubmission = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${palette.night};
  color: ${palette.moon};
  @media (prefers-color-scheme: dark) {
    background-color: ${palette.moon};
    color: ${palette.night};
  }
  h1 {
    ${typography.label.l1}
    flex: 1;
  }
  h2 {
    ${typography.label.l3}
  }
`
