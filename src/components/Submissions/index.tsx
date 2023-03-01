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
import { ISubmissionFragment } from '@types'
import Submission from './Submission'

interface SubmissionsProps {
  submissions: Array<ISubmissionFragment>
}

export default function Submissions({ submissions }: SubmissionsProps): JSX.Element {
  console.log('submissions   ', submissions)

  return (
    <StyledSubmissions>
      {submissions?.map((submissionData: ISubmissionFragment, index: number) => (
        <Submission key={index} {...submissionData} />
      ))}
    </StyledSubmissions>
  )
}

const StyledSubmissions = styled.div`
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
`
