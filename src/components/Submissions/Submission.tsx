import React from 'react'
import styled from 'styled-components'
import { palette, typography } from '@theme'
import { rgba } from '@lib'
import { ISubmissionFragment } from '@types'
import { Project } from '@components'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

export default function Submission(submission: ISubmissionFragment): JSX.Element {
  const { push } = useRouter()

  return (
    <StyledSubmission
      onClick={() => push(`/admin/projects/${submission.project?.id}`)}
      id={`submission-component-${submission.project?.id}`}
    >
      <Headline>Submitted on: {dayjs(submission.createdAt).format('MMMM DD YYYY, HH:mm')}</Headline>
      {submission.project && <Project projectData={submission.project} displayType="brief" />}
    </StyledSubmission>
  )
}

const Headline = styled.h3`
  ${typography.label.l1}
  margin-bottom: 1rem;
`

const StyledSubmission = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  ${typography.label.l3}
  margin-bottom: 1rem;
  background-color: ${rgba(palette.stone, 0.24)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`
