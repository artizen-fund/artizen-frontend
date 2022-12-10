import { useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { useGrant } from '@lib'

import { INSERT_GRANTS, LOAD_GRANTS, INSERT_ARTIFACTS, INSERT_PROJECTS, INSERT_PROJECTS_MEMBERS } from '@gql'
import {
  IInsert_GrantsMutation,
  IInsert_ArtifactsMutation,
  IInsert_ProjectsMutation,
  IInsert_ProjectMembersMutation,
  ILoadGrantsQuery,
} from '@types'

import { Form, Button } from '@components'
// import { typography } from '@theme'
import { useRouter } from 'next/router'

import {
  schema,
  uischema,
  initialState,
  FormState,
  Grant,
  Artifacts,
  Project,
  ProjectMembers,
} from '@forms/createGrants'

//<Grants />

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const CreateGrants = () => {
  const {
    push,
    query: { id },
  } = useRouter()
  const { publish } = useGrant()

  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertArtifactsM] = useMutation<IInsert_ArtifactsMutation>(INSERT_ARTIFACTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjecstMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)
  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: id === undefined || id === 'new',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  const [data, setData] = useState<FormState>(initialState)

  const [processing, setProcessing] = useState(false)

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  const saveChanges = async (formData: FormState) => {
    setProcessing(true)

    const artifactId = await insertArtifactF(formData.artifacts)

    const projectId = await insertProjectsF(formData.project)

    await insertProjecttMembers(formData.projectMembers, projectId)

    //finally insert grants
    const newgGrantDBDate = await insertGrants(formData.grant, artifactId, projectId)

    setProcessing(false)

    push(`/admin/grants/${newgGrantDBDate}`)

    return
  }

  //TODO: This should be break down into smaller units
  const insertArtifactF = async (artifactsData: Artifacts) => {
    // check there is 3 values in array

    const artifactsDBCreationReturn = await insertArtifactsM({
      variables: {
        objects: artifactsData,
      },
    })

    if (artifactsDBCreationReturn.data?.insert_Artifacts === undefined) {
      throw new Error('error creating artifacts in DB')
    }

    return artifactsDBCreationReturn.data?.insert_Artifacts?.returning[0].id
  }

  const insertProjectsF = async (projectsData: Project) => {
    const projectDBCreationReturn = await insertProjectsM({
      variables: {
        objects: projectsData,
      },
    })

    if (projectDBCreationReturn.data?.insert_Projects === undefined) {
      throw new Error('error creating project in DB')
    }

    return projectDBCreationReturn.data?.insert_Projects?.returning[0].id
  }

  const insertProjecttMembers = async (projectMemberData: ProjectMembers, projectId: string) => {
    const insertProjectMembersReturn = await insertProjecstMemberInDB({
      variables: {
        objects: [
          {
            projectId,
            type: projectMemberData.type,
            user: {
              data: {
                firstName: projectMemberData.firstName,
                lastName: projectMemberData.lastName,
                publicAddress: projectMemberData.wallet,
                externalLink: projectMemberData.externalLink,
                email: projectMemberData.email,
              },
            },
          },
        ],
      },
    })

    if (insertProjectMembersReturn?.data?.insert_ProjectMembers === undefined) {
      throw new Error('error adding project members to project in DB')
    }
  }

  const insertGrants = async (grantData: Grant, artifactId: string, projectId: string) => {
    const insertGrantsMReturn = await insertGrantsM({
      variables: {
        objects: [
          {
            status: 'draft',
            submission: {
              data: {
                artifactId,
                projectId,
              },
            },
            ...grantData,
          },
        ],
      },
    })

    if (insertGrantsMReturn.data?.insert_Grants === undefined) {
      throw new Error('error creating grant in DB')
    }

    return insertGrantsMReturn.data?.insert_Grants?.returning[0].date
  }

  return (
    <FormWrapper>
      {!loadedGrantData && (
        <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
          <StyledButton disabled={processing || loading} onClick={() => saveChanges(data)} stretch level={0}>
            {processing ? 'Saving...' : 'Save Draft'}
          </StyledButton>
        </Form>
      )}
      {loadedGrantData && (
        <>
          <GrantContentWrapper>Grant Date: {loadedGrantData.Grants[0].date}</GrantContentWrapper>
          <GrantContentWrapper>Status: {loadedGrantData.Grants[0].status}</GrantContentWrapper>
          <FooterWrapper>
            <StyledButton disabled={true} stretch onClick={() => alert('TODO')} level={0}>
              Publish Grant
            </StyledButton>
            <StyledButton disabled={true} stretch onClick={() => alert('TODO')} level={0}>
              End Grant
            </StyledButton>
          </FooterWrapper>
        </>
      )}
    </FormWrapper>
  )
}

const GrantContentWrapper = styled.div`
  width: 80%;
  display: block;
`

const FooterWrapper = styled.div`
  width: 80%;
  display: flex;
`

/*
grid-template-areas: `firstname lastname, email email, submit submit`

const Email = styled.div`
  grid-area: email;
`
*/

const FormWrapper = styled.div`
  padding: 100px;
  .group-layout legend {
    font-size: 30px;
  }
  .group-layout {
    margin: 40px 0;
  }

  // display: grid;

  // grid-template-areas:
  //   'artworkPatron ' 'artworkCreator' 'artworkCommunity'
  //   .vertical-layout-item {
  //   display: contents;
  // }
  * [id='#/properties/artifacts/properties/artworkPatron'] {
    display: block;
    grid-area: artworkPatron;
  }

  *[id='#/properties/artifacts/properties/artworkCreator'] {
    display: block;
    grid-area: artworkCreator;
  }

  *[id='#/properties/artifacts/properties/artworkCommunity'] {
    display: block;
    grid-area: artworkCommunity;
  }

  // display: grid;
  // justify-items: stretch;
  // gap: 10px;
  grid-template-areas:
    'startDate startDate'
    * [id= '#/properties/startDate' ] {
    grid-area: startDate;
  }

  *[id='#/properties/season'] {
    grid-area: season;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
  width: 170px;
  margin: 10px 30px 0 10px;
  float: right;
`

export default CreateGrants
