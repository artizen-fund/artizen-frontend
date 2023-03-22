import styled from 'styled-components'
import { palette, typography } from '@theme'
import { rgba } from '@lib'
import { ISubmissionFragment } from '@types'
import Submission from './Submission'

interface SubmissionsProps {
  submissions: Array<ISubmissionFragment>
}

export default function Submissions({ submissions }: SubmissionsProps): JSX.Element {
  return (
    <StyledSubmissions>
      {submissions?.length === 0 && <NonSubmission>No submissions yet</NonSubmission>}
      {submissions?.map(
        (submissionData: ISubmissionFragment, index: number) =>
          submissionData?.project && <Submission key={index} {...submissionData} />,
      )}
    </StyledSubmissions>
  )
}

const NonSubmission = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${rgba(palette.night)};
  ${typography.body.l3}

  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.barracuda)};
  }
`

const StyledSubmissions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
