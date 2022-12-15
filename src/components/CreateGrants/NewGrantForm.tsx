import { useState } from 'react'
import styled from 'styled-components'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { typography } from '@theme'
import moment from 'moment-timezone'

import {
  INSERT_GRANTS,
  INSERT_PROJECTS,
  INSERT_PROJECTS_MEMBERS,
  GET_USERS,
  CREATE_USERS,
  UPDATE_USERS,
  LOAD_GRANTS,
} from '@gql'
import {
  IInsert_GrantsMutation,
  IInsert_ProjectsMutation,
  IInsert_ProjectMembersMutation,
  ILoadGrantsQuery,
  IGetUsersQuery,
  ICreateUsersMutation,
  IUpdateUsersMutation,
} from '@types'

import { Form, Button } from '@components'
import { useRouter } from 'next/router'

import {
  schema,
  uischema,
  initialState,
  FormState,
  Grant,
  Artifacts,
  Project,
  ProjectMember,
} from '@forms/createGrants'

//TODO: startingDate is set by publishing function
//TODO: closingDate is set by ending function

const NewGrantForm = () => {
  const { push } = useRouter()

  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjecstMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)

  //users
  const [getUser] = useLazyQuery<IGetUsersQuery>(GET_USERS)
  const [insertUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)
  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USERS)

  const [data, setData] = useState<FormState>(initialState)

  console.log('initialState   ', initialState)

  const [processing, setProcessing] = useState(false)

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    variables: {
      order_by: [{ closingDate: 'desc_nulls_last' }],
      limit: 1,
    },
  })

  if (loading) {
    return <div>Loading Grant</div>
  }

  if (errorLoadingGrant) {
    console.error('errorLoadingGrant ', errorLoadingGrant)
    return <div>Error loading grant</div>
  }

  const grant = loadedGrantData?.Grants[0]
  const startingDateBase = grant?.closingDate || moment.tz('America/Los_Angeles')
  const startingDate = moment(startingDateBase).add(1, 's')

  const thereIsOneLead = (projectMembersR: Array<ProjectMember>) =>
    projectMembersR.filter(({ type, wallet }) => type === 'lead' && wallet !== undefined).length === 1

  const saveChanges = async (formData: FormState) => {
    console.log('formData   ', formData)

    console.log('thereIsOneLead(formData.projectMembers)  ', thereIsOneLead(formData.projectMembers))

    //check user
    if (!thereIsOneLead(formData.projectMembers)) {
      alert(' You need to add one project member with role lead and a blockchain wallet')
    }

    setProcessing(true)

    const projectId = await insertProjectsF(formData.project)

    console.log('projectId  ', projectId)

    await insertProjecttMembers(formData.projectMembers, projectId)

    const artifactsData = mapArtifactF(formData.artifacts)

    // //finally insert grants
    const newgGrantDBDate = await insertGrants(formData.grant, artifactsData, projectId)

    console.log('newgGrantDBDate  ', newgGrantDBDate)

    setProcessing(false)

    push(`/admin/grants/${newgGrantDBDate}`)

    return
  }

  //TODO: This should be break down into smaller units
  const mapArtifactF = (artifactsData: Artifacts) => {
    return [
      {
        edition: 'community',
        artwork: artifactsData.artworkCommunity,
      },
      {
        edition: 'patron',
        artwork: artifactsData.artworkPatron,
      },
      {
        edition: 'creator',
        artwork: artifactsData.artworkCreator,
      },
    ]
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

  const insertProjecttMembers = async (projectMemberData: Array<ProjectMember>, projectId: string) => {
    const membersData = projectMemberData.map(async (member: ProjectMember) => {
      console.log('insertProjecttMembers  ', member.email)

      if (!member.email) {
        // eslint-disable-next-line
        throw new Error("You're trying to add a user without email")
      }

      console.log('gets to loaded getUser')

      const { data, error } = await getUser({
        variables: {
          where: {
            ...(member.email && {
              email: {
                _eq: member.email,
              },
            }),
            ...(member.wallet && {
              email: {
                _eq: member.email,
              },
            }),
          },
        },
      })

      if (error) {
        throw new Error('Error loading user')
      }

      console.log('error loading user  ', error)

      console.log('user in database===  ', data?.Users)

      let userId = ''

      // creating user
      if (data?.Users.length === 0) {
        console.log('creating new user in DB')

        const insertUserRn = await insertUser({
          variables: {
            objects: [
              {
                firstName: member.firstName,
                lastName: member.lastName,
                publicAddress: member?.wallet,
                externalLink: member.externalLink,
                email: member.email,
              },
            ],
          },
        })

        console.log('new added user insertUserRn   ', insertUserRn)

        if (!insertUserRn.data?.insert_Users) {
          throw new Error('Error inserting new user to DB')
        }

        userId = insertUserRn.data.insert_Users.returning[0].id
      }

      // updating user
      if (data?.Users.length === 1) {
        //update user
        console.log('updating user ')

        const updateUserRn = await updateUser({
          variables: {
            where: {
              email: {
                _eq: member.email,
              },
            },
            _set: {
              firstName: member.firstName,
              lastName: member.lastName,
              ...(member?.wallet && { publicAddress: member?.wallet }),
              externalLink: member.externalLink,
            },
          },
        })

        console.log('updateUserRn   ', updateUserRn)

        if (!updateUserRn.data?.update_Users) {
          throw new Error('Error updating user in DB')
        }

        userId = updateUserRn.data.update_Users.returning[0].id
      }

      console.log('userId   ', userId)

      const insertProjectMembersReturn = await insertProjecstMemberInDB({
        variables: {
          objects: [
            {
              projectId,
              type: member.type,
              userId,
            },
          ],
        },
      })

      console.log(
        'insertProjectMembersReturn?.data?.insert_ProjectMember   ',
        insertProjectMembersReturn?.data?.insert_ProjectMembers,
      )

      if (insertProjectMembersReturn?.data?.insert_ProjectMembers === undefined) {
        throw new Error('error adding project members to project in DB')
      }

      ////
    })

    return Promise.all(membersData)
  }

  const insertGrants = async (grantData: Grant, artifactsData: any, projectId: string) => {
    const { length, ...restData } = grantData

    console.log('grant lenghth', length)
    console.log('artifactsData  ', artifactsData)
    console.log('projectId  ', projectId)

    const staringTimeRaw = startingDate.format('YYYY-MM-DDTHH:mm:ss')
    console.log('startingDate  ', startingDate.format('YYYY-MM-DDThh:mm:ss'))
    console.log('ending time after 10min', moment(staringTimeRaw).add(10, 'm').format('YYYY-MM-DDThh:mm:ss'))

    const variables = {
      objects: [
        {
          status: 'draft',
          startingDate: staringTimeRaw,
          closingDate: moment(staringTimeRaw).add(length, 'm').format('YYYY-MM-DDTHH:mm:ss'),
          date: startingDate,
          submission: {
            data: {
              artifacts: {
                data: artifactsData,
              },
              projectId,
            },
          },
          ...restData,
        },
      ],
    }

    console.log('variables  ', variables)

    const insertGrantsMReturn = await insertGrantsM({
      variables,
    })

    console.log('insertGrantsMReturn   ', insertGrantsMReturn)

    if (insertGrantsMReturn.data?.insert_Grants === undefined) {
      throw new Error('error creating grant in DB')
    }

    return insertGrantsMReturn.data?.insert_Grants?.returning[0].id
  }

  return (
    <FormWrapper>
      <TileTitle>Starting time: {startingDate.format('DD-MM-YYYY HH:mm:ss')} (PST)</TileTitle>
      <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
        <StyledButton disabled={processing} onClick={() => saveChanges(data)} stretch level={0}>
          {processing ? 'Saving...' : 'Save Draft'}
        </StyledButton>
      </Form>
    </FormWrapper>
  )
}

const TileTitle = styled.h3`
  ${typography.title.l3}
`

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

  .array-table-layout {
    text-align: center;

    color: white;
    input {
      color: white;
    }

    table {
      width: 100%;
    }

    tbody {
      background-color: white;
      margin: 10px;

      input {
        color: black;
        font-size: 14px;
        margin: 0 4px;
        font-weight: bold;
        height: 64px;
      }
    }

    th {
      text-align: left;
    }

    td {
      text-align: left;
    }

    button {
      cursor: pointer;
    }

    header {
      text-align: right;
      margin: 10px 0;

      label {
        display: none;
      }

      button {
        color: white;
        font-weight: bold;
      }
    }
  }

  *[aria-label='Delete'] {
    color: red;
    padding: 0 6px;
  }

  // *[data-content='Valid'] {
  //   color: red;
  // }

  //TODO: It does not work f*****!"!!
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  // .horizontal-layout,
  // .horizontal-layout-item {
  //   display: contents;
  // }

  // grid-template-areas: 'artworkPatron';

  // *[id='#/properties/artifacts/properties/artworkPatron'] {
  //   grid-area: artworkPatron;
  // }

  // *[id='#/properties/artifacts/properties/artworkCreator'] {
  //   grid-area: artworkCreator;
  // }

  // *[id='#/properties/artifacts/properties/artworkCommunity'] {
  //   grid-area: artworkCommunity;
  // }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-area: saveChanges;
  margin-top: 20px;
  width: 170px;
  margin: 10px 30px 0 10px;
  float: right;
`

export default NewGrantForm
