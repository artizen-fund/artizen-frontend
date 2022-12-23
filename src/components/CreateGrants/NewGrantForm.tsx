import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { breakpoint, typography, palette } from '@theme'
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
  IUpdateUsersHereMutation,
} from '@types'
import { Form, Button, Spinner } from '@components'
import {
  schema,
  uischema,
  initialState,
  FormState,
  Grant,
  Project,
  ProjectMember,
  Artifacts,
} from '@forms/createGrants'
import { ARTIZEN_TIMEZONE, rgba } from '@lib'
import {
  thereIsOneLead,
  thereIsIncompleteInformationFilled,
  getUsersWalletIsNotCorrect,
  mapArtifactF,
  getGrantDates,
  MappedArtifact,
} from './helpers'

const NewGrantForm = () => {
  const { push } = useRouter()

  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjectsMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)

  //users
  const [getUser] = useLazyQuery<IGetUsersQuery>(GET_USERS)
  const [insertUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)
  const [updateUser] = useMutation<IUpdateUsersHereMutation>(UPDATE_USERS)

  const [data, setData] = useState<FormState>(initialState)

  const [processing, setProcessing] = useState(false)

  const { loading, data: loadedGrantData } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    variables: {
      order_by: [{ closingDate: 'desc_nulls_last' }],
      limit: 1,
    },
  })

  useEffect(() => {
    // set grant start date (readonly, not user editable)
    const startingDateBase = loadedGrantData?.Grants[0]?.closingDate || moment.tz(ARTIZEN_TIMEZONE)
    const date = moment(startingDateBase)
    setData({
      ...data,
      grant: {
        ...data.grant,
        date: date.format('YYYY-MM-DD HH:mm:ss'),
      },
    })
  }, [loadedGrantData])

  const saveNewGrant = async () => {
    // validate users array
    if (!thereIsOneLead(data.projectMembers) || thereIsIncompleteInformationFilled(data.projectMembers)) {
      alert(
        'You need to add all the project member data and at least one member with role lead and a blockchain wallet',
      )
      return
    }

    const usersWithIncorrectWallet = getUsersWalletIsNotCorrect(data.projectMembers)
    if (usersWithIncorrectWallet.length > 0) {
      alert(usersWithIncorrectWallet.join())
      return
    }

    setProcessing(true)

    try {
      // insert project and members
      const projectId = await insertProjectsF(data.project)
      await insertProjectMembers(data.projectMembers, projectId)

      // insert grant
      const newGrantDate = await insertGrant(projectId)

      push(`/admin/grants/${newGrantDate}`)
    } catch (error) {
      setProcessing(false)
      alert(error)
    }
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
      const { data } = await getUser({
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
                  _eq: member.wallet?.toLowerCase(),
                },
              },
            ],
          },
        },
      })
      let userId = ''
      if (data?.Users.length === 0) {
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
        if (!insertUserRn.data?.insert_Users) {
          throw new Error('Error inserting new user to DB')
        }
        userId = insertUserRn.data.insert_Users.returning[0].id
      }
      if (data?.Users.length === 1) {
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
        if (!updateUserRn.data?.update_Users) {
          throw new Error('Error updating user in DB')
        }
        userId = updateUserRn.data.update_Users.returning[0].id
      }
      const insertProjectMembersReturn = await insertProjectsMemberInDB({
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

  const insertGrant = async (projectId: string) => {
    const { length, ...etc } = data.grant
    const startingDate = moment(data.grant.date)
    const [startingDateRaw, closingDateRaw] = getGrantDates(startingDate, length)
    const artifactsData = mapArtifactF(data.artifacts)
    const variables = {
      objects: [
        {
          status: 'draft',
          startingDate: startingDateRaw,
          closingDate: closingDateRaw,
          submission: {
            data: {
              artifacts: {
                data: artifactsData,
              },
              projectId,
            },
          },
          ...etc,
        },
      ],
    }
    const insertGrantsReturn = await insertGrantsM({ variables })
    if (insertGrantsReturn.data?.insert_Grants === undefined) {
      throw new Error('error creating grant in DB')
    }
    return insertGrantsReturn.data?.insert_Grants?.returning[0].id
  }

  return loading ? (
    <Spinner minHeight="85vh" />
  ) : (
    <Wrapper>
      <FormWrapper>
        <Form {...{ schema, uischema, initialState, data, setData }} readonly={processing}>
          <StyledButton onClick={() => saveNewGrant()} stretch level={0}>
            {processing ? 'Saving...' : 'Save Draft'}
          </StyledButton>
        </Form>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 150px 0;
  min-height: 100vh;
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

  legend {
    margin-top: 30px;
    ${typography.label.l3}
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
    .horizontal-layout-4 {
      display: contents;
      > * {
        grid-column-end: span 3;
      }
    }
    .horizontal-layout-6 {
      display: contents;
      > * {
        grid-column-end: span 2;
      }
    }
  }

  .array-table-layout {
    header {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    tr {
      display: flex;
    }
    td,
    th {
      flex: 2;
      padding: 0px 0px 10px 0px;
      text-align: left;
    }
    td:nth-child(8),
    th:nth-child(8) {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    td:nth-child(7),
    th:nth-child(7) {
      display: none;
    }
    button {
      color: black;
      border: 1px solid black;
      @media (prefers-color-scheme: dark) {
        border: 1px solid white;
        color: white;
      }
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
      border: 1px solid ${rgba(palette.stone)};
      width: 100%;
      padding: 18px 0px 18px 8px;
      @media (prefers-color-scheme: dark) {
        border: 1px solid ${rgba(palette.stone)};
        color: ${rgba(palette.slate)};
        background: ${rgba(palette.moon)};
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
