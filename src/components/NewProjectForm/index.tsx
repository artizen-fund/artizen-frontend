import styled from 'styled-components'
import { ErrorObject } from 'ajv'
import { Form, Button, Spinner } from '@components'
import { schema, uischema, FormState } from '@forms/createProjects'
import { breakpoint } from '@theme'

interface NewProjectFormProps {
  addData: (data: FormState) => void
  tempValue: FormState
  processing: boolean
  saveNewProject: () => void
  additionalErrors: Array<ErrorObject>
}

const NewProjectForm = ({ addData, tempValue, processing, saveNewProject, additionalErrors }: NewProjectFormProps) => {
  return (
    <Wrapper>
      <WrapperForm>
        <Form data={tempValue} setData={addData} {...{ schema, uischema, additionalErrors }} readonly={processing}>
          <StyledButton onClick={saveNewProject} stretch level={0}>
            {processing ? 'Saving...' : 'Save'}
          </StyledButton>
        </Form>
      </WrapperForm>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 2;
  margin-top: 20px;
`

//'title', 'logline', 'impactTags', 'walletAddress', 'info1', 'info2', 'info3', 'info4'
const WrapperForm = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'title logline'
    'impactTags walletAddress'
    'info1 info1'
    'info2 info2'
    'info3 info3'
    'info4 info4'
    'artworkArtifact videoArtifact';

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/title'] {
    grid-area: title;
  }

  *[id='#/properties/logline'] {
    grid-area: logline;
  }

  *[id='#/properties/impactTags'] {
    grid-area: impactTags;
  }

  *[id='#/properties/walletAddress'] {
    grid-area: walletAddress;
  }

  *[id='#/properties/info1'] {
    grid-area: info1;
  }

  *[id='#/properties/info2'] {
    grid-area: info2;
  }

  *[id='#/properties/info3'] {
    grid-area: info3;
  }

  *[id='#/properties/info4'] {
    grid-area: info4;
  }

  *[id='#/properties/artworkArtifact'] {
    grid-area: artworkArtifact;
  }

  *[id='#/properties/videoArtifact'] {
    grid-area: videoArtifact;
  }
`

export default NewProjectForm
