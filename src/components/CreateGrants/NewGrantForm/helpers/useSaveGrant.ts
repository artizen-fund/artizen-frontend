import { useMutation, useLazyQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { INSERT_GRANTS, INSERT_PROJECTS, INSERT_PROJECTS_MEMBERS, GET_USERS, CREATE_USERS, UPDATE_USERS } from '@gql'
import {
  IInsert_GrantsMutation,
  IInsert_ProjectsMutation,
  IInsert_ProjectMembersMutation,
  IGetUsersQuery,
  ICreateUsersMutation,
  IUpdateUsersHereMutation,
} from '@types'
import { FormState, Project, ProjectMember } from '@forms/createGrants'
import { mapArtifactF, getGrantDates } from './'

const useSaveGrant = () => {
  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjectsMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)

  //users
  const [getUser] = useLazyQuery<IGetUsersQuery>(GET_USERS)
  const [insertUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)
  const [updateUser] = useMutation<IUpdateUsersHereMutation>(UPDATE_USERS)

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

  const insertGrant = async (data: FormState, projectId: string) => {
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

  return { insertProjectsF, insertProjectMembers, insertGrant }
}

export default useSaveGrant
