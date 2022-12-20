import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { typography } from '@theme'
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
import { schema, uischema, initialState, FormState, Grant, Project, ProjectMember } from '@forms/createGrants'
import { ARTIZEN_TIMEZONE } from '@lib'
import { breakpoint } from '@theme'
import { thereIsOneLead, thereIsIncompleteInformationFilled, getUsersWalletIsNotCorrect, mapArtifactF } from './helpers'

const NewGrantForm = () => {
  const { push } = useRouter()

  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjecstMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)

  //users
  const [getUser, { error }] = useLazyQuery<IGetUsersQuery>(GET_USERS)
  const [insertUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)
  const [updateUser] = useMutation<IUpdateUsersMutation>(UPDATE_USERS)

  const [data, setData] = useState<FormState>(initialState)

  useEffect(() => {
    if (!error) return
    console.error('error', error)
  }, [error])

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

  useEffect(() => {
    if (!errorLoadingGrant) return
    console.error('errorLoadingGrant', errorLoadingGrant)
  }, [errorLoadingGrant])

  const grant = loadedGrantData?.Grants[0]
  const startingDateBase = grant?.closingDate || moment.tz(ARTIZEN_TIMEZONE)
  const startingDate = moment(startingDateBase).add(1, 's')

  const saveChanges = async (formData: FormState) => {
    console.log('formData   ', formData)
    console.log('thereIsOneLead(formData.projectMembers)  ', thereIsOneLead(formData.projectMembers))
    console.log(
      'thereIsIncompleteInformationFilled(formData.projectMembers)  ',
      thereIsIncompleteInformationFilled(formData.projectMembers),
    )
    //check user
    if (!thereIsOneLead(formData.projectMembers) || thereIsIncompleteInformationFilled(formData.projectMembers)) {
      alert(
        ' You need to add all the project member data and at least one member with role lead and a blockchain wallet',
      )
      return
    }
    const usersWithIncorrectWallet = getUsersWalletIsNotCorrect(formData.projectMembers)
    console.log('usersWithIncorrectWallet  ', usersWithIncorrectWallet)
    if (usersWithIncorrectWallet.length > 0) {
      alert(usersWithIncorrectWallet.join())
      return
    }
    setProcessing(true)
    const projectId = await insertProjectsF(formData.project)
    console.log('projectId  ', projectId)
    await insertProjectMembers(formData.projectMembers, projectId)
    const artifactsData = mapArtifactF(formData.artifacts)
    // finally insert grants
    const newgGrantDBDate = await insertGrants(formData.grant, artifactsData, projectId)
    setProcessing(false)
    push(`/admin/grants/${newgGrantDBDate}`)
    return
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

  const insertProjectMembers = async (projectMemberData: Array<ProjectMember>, projectId: string) => {
    const membersData = projectMemberData.map(async (member: ProjectMember) => {
      console.log('insertProjectMembers  ', member.email)

      if (!member.email) {
        // eslint-disable-next-line
        throw new Error("You're trying to add a user without email")
      }

      console.log('gets to loaded getUser', member.email)

      const { data, error } = await getUser({
        variables: {
          where: {
            _or: [
              {
                email: {
                  _eq: member.email,
                },
              },
              {
                publicAddress: {
                  _eq: member.wallet,
                },
              },
            ],
          },
        },
      })

      console.log('user in database===  ', data)
      console.log('console.log user  ', error)

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
                publicAddress: member?.wallet?.toLowerCase(),
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
      if (insertProjectMembersReturn?.data?.insert_ProjectMembers === undefined) {
        throw new Error('error adding project members to project in DB')
      }
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
    const insertGrantsReturn = await insertGrantsM({ variables })
    console.log('insertGrantsReturn', insertGrantsReturn)
    if (insertGrantsReturn.data?.insert_Grants === undefined) {
      throw new Error('error creating grant in DB')
    }
    return insertGrantsReturn.data?.insert_Grants?.returning[0].id
  }

  return loading ? (
    <div>Loading Grant</div>
  ) : (
    <>
      <TileTitle>Starting time: {startingDate.format('DD-MM-YYYY HH:mm:ss')} (PST)</TileTitle>
      <FormWrapper>
        <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}></Form>
        <StyledButton disabled={processing} onClick={() => saveChanges(data)} stretch level={0}>
          {processing ? 'Saving...' : 'Save Draft'}
        </StyledButton>
      </FormWrapper>
    </>
  )
}

const TileTitle = styled.h3`
  ${typography.title.l3}
`

const FormWrapper = styled.div`
  display: grid;
  gap: 15px;

  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;

  .vertical-layout,
  .vertical-layout-item,
  .group-layout,
  .group-layout-item {
    display: contents;
  }

  .array-table-layout {
    grid-column: 1 / span 12;
  }

  legend {
    grid-column: 1 / span 12;
  }

  .horizontal-layout {
    display: contents;
    .horizontal-layout-1 {
      display: contents;
      > * {
        grid-column-end: span 12;
      }
    }
    .horizontal-layout-2 {
      display: contents;
      > * {
        grid-column-end: span 6;
      }
    }
    .horizontal-layout-3 {
      display: contents;
      > * {
        grid-column-end: span 4;
      }
    }
    .horizontal-layout-6 {
      display: contents;
      > * {
        grid-column-end: span 2;
      }
    }
  }

  .group-layout legend {
    font-size: 30px;
  }
  .group-layout {
    margin: 40px 0;
  }

  .array-table-layout {
    outline: 1px dashed red;
    header {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    button {
      color: black;
      border: 1px solid black;
      padding: 4px 20px;
      border-radius: 9999px;
      cursor: pointer;
      font-style: normal;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.5px;
      ${typography.label.l2}
      transition: transform 0.15s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
    input {
      border: 1px solid black;
      width: 100%;
      padding: 18px 16px 18px 16px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        padding: 20px 24px 20px 24px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        padding: 22px 32px 22px 32px;
      }
    }
  }

  *[aria-label='Delete'] {
    color: red;
    padding: 0 6px;
  }
`

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 12;
  margin-top: 20px;
`

export default NewGrantForm
