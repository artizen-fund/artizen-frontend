// functional componet that takes in a prop of type Submission
// and returns a JSX element
// save the component in a constant called Submission
// style the component using styled components

// import the Submission component
// import the styled component
// create a functional component called Submissions
// style the component using styled components
// return a JSX element
// the JSX element should contain the styled component
// the JSX element should contain the Submission component

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
      {submissions?.map((submissionData: ISubmissionFragment, index: number) => (
        <Submission key={index} {...submissionData} />
      ))}
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
  border-radius: 16px;
  background-color: ${rgba(palette.night)};
  color: ${rgba(palette.moon)};

  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
    color: ${rgba(palette.white)};
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
