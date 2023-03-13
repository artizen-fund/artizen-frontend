import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { ErrorObject } from 'ajv'
import { useDebounce } from 'use-debounce'
import { typography, palette, breakpoint } from '@theme'
import { LOAD_GRANTS } from '@gql'
import { ILoadGrantsQuery, IProjectFragment } from '@types'
import { Form, Button, Spinner } from '@components'
import { schema, uischema, FormState } from '@forms/createProjects'
import { rgba } from '@lib'
import { validateProjectMembers, useSaveProject, getGrantDates } from './lib'

interface NewProjectFormProps {
  addData: (data: FormState) => void
  tempValue: FormState
  processing: boolean
  saveNewProject: () => void
  additionalErrors: Array<ErrorObject>
}

const NewProjectForm = ({ addData, tempValue, processing, saveNewProject, additionalErrors }: NewProjectFormProps) => {
  const { insertProject, insertMembers, insertGrant } = useSaveProject()

  // const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  // useEffect(() => {
  //   if (!debouncedData) return

  //   // set additional form validators here
  //   const errors: Array<ErrorObject> = []
  //   if (!validateLib.validate(debouncedData.project.walletAddress, 'ETH')) {
  //     errors.push({
  //       instancePath: '/project/walletAddress',
  //       message: 'Invalid blockchain address',
  //       schemaPath: '#/properties/project/properties/walletAddress',
  //       keyword: '',
  //       params: {},
  //     })
  //   }
  //   setAdditionalErrors(errors)
  // }, [debouncedData])

  // const saveNewProject = async () => {
  //   // if (!data || !validateProjectMembers(data.projectMembers)) return
  //   setProcessing(true)

  //   addData(generalData)

  //   console.log(' generalData: ', generalData)

  //   // try {
  //   //   const projectId = await insertProject(data.project)
  //   //   await insertMembers(data.projectMembers, projectId)
  //   //   const newGrantDate = await insertGrant(data, projectId)
  //   //   push(`/admin/grants/${newGrantDate}`)
  //   // } catch (error) {
  //   //   setProcessing(false)
  //   //   alert(error)
  //   // }
  // }

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
