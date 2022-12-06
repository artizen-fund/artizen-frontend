import { useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'

import { INSERT_GRANTS, LOAD_GRANTS, INSERT_ARTIFACTS, INSERT_PROJECTS, INSERT_PROJECTS_MEMBERS } from '@gql'
import { Form, Button } from '@components'
import { typography } from '@theme'
import { useRouter } from 'next/router'

import { schema, uischema, initialState, FormState } from '@forms/createGrants'

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const CreateGrants = () => {
  const {
    push,
    query: { id },
  } = useRouter()

  const [insertGrantsM] = useMutation(INSERT_GRANTS)
  const [insertArtifactsM] = useMutation(INSERT_ARTIFACTS)
  const [insertProjectsM] = useMutation(INSERT_PROJECTS)
  const [insertProjectMemberInDB] = useMutation(INSERT_PROJECTS_MEMBERS)
  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery(LOAD_GRANTS, {
    skip: id === undefined || id === 'new',
    variables: {
      where: {
        date: {
          _eq: id,
        },
      },
    },
  })

  const [data, setData] = useState<FormState>({})

  const [processing, setProcessing] = useState(false)

  if (errorLoadingGrant) {
    return <div>Error loading grant</div>
  }

  const saveChanges = async ({ grant, artifacts, project, projectMembers }) => {
    setProcessing(true)

    const artifactId = await insertArtifactF(artifacts)

    const projectId = await insertProjectsF(project)

    await insertProjecttMembers(projectMembers, projectId)

    //finally insert grants
    const newgGrantDBDate = await insertGrants({ grantData: grant, artifactId, projectId })

    console.log('grantDBId     ', newgGrantDBDate)

    push(`/admin/grants/${newgGrantDBDate}`)

    setProcessing(false)
  }

  //TODO: This should be break down into smaller units
  const insertArtifactF = async artifactsData => {
    // check there is 3 values in array

    TODO: console.log('artifactsData ', artifactsData)

    const artifactsDBCreationReturn = await insertArtifactsM({
      variables: {
        objects: artifactsData,
      },
    })

    console.log('artifactsDBCreationReturn ', artifactsDBCreationReturn)

    if (artifactsDBCreationReturn.data?.insert_Artifacts === undefined) {
      throw new Error('error creating artifacts in DB')
    }

    return artifactsDBCreationReturn.data?.insert_Artifacts?.returning[0].id

    // console.log('cloudinaryResponse ', cloudinaryResponse)
    // return cloudinaryResponse.secure_url
  }

  const insertProjectsF = async projectsData => {
    const projectDBCreationReturn = await insertProjectsM({
      variables: {
        objects: projectsData,
      },
    })

    console.log('projectDBCreationReturn     ', projectDBCreationReturn)

    if (projectDBCreationReturn.data?.insert_Projects === undefined) {
      throw new Error('error creating project in DB')
    }

    return projectDBCreationReturn.data?.insert_Projects?.returning[0].id
  }

  const insertProjecttMembers = async (projectMemberData, projectId) => {
    //insertProjectMemberInDB

    const insertProjectMembersReturn = await insertProjectMemberInDB({
      variables: {
        objects: [
          {
            projectId,
            type: 'lead',
            user: {
              data: {
                publicAddress: '0x000000002',
                artizenHandle: 'user8',
                email: 'user8@email.com',
              },
            },
          },
        ],
      },
    })

    console.log('insertProjectMembersReturn         ', insertProjectMembersReturn)
  }

  const insertGrants = async ({ grantData, artifactId, projectId }) => {
    const insertGrantsMReturn = await insertGrantsM({
      variables: {
        objects: [
          {
            status: 'draft',
            submissions: {
              data: [
                {
                  artifactId,
                  projectId,
                },
              ],
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
            {loading ? 'Saving...' : 'Save Draft'}
          </StyledButton>
        </Form>
      )}
      {loadedGrantData && (
        <>
          {loadedGrantData.Grants[0].title}
          <FooterWrapper>
            <StyledButton disabled={true} stretch onClick={() => {}} level={0}>
              Publish Grant
            </StyledButton>
            <StyledButton disabled={true} onClick={() => {}} stretch level={0}>
              End Grant
            </StyledButton>
          </FooterWrapper>
        </>
      )}
    </FormWrapper>
  )
}

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

const NotificationsBanner = styled.div`
  grid-area: socialLinksBanner;
  margin-top: 20px;
  ${typography.label.l1}
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
  width: 170px;
  margin: 10px 30px 0 10px;
  float: right;
`

export default CreateGrants
