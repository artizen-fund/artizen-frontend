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

  const insertProjects = async (objects: Project) => {
    const projectDBCreationReturn = await insertProjectsM({
      variables: {
        objects,
      },
    })
    if (projectDBCreationReturn.data?.insert_Projects === undefined) {
      throw new Error('error creating project in DB')
    }
    return projectDBCreationReturn.data?.insert_Projects?.returning[0].id
  }

  const insertMembers = async (projectMemberData: Array<ProjectMember>, projectId: string) => {
    const membersData = projectMemberData.map(async (member: ProjectMember) => {
      const userId = getUserRecord(member)
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

  const getUserRecord = async (member: ProjectMember) => {
    const { data } = await getUser({
      variables: {
        where: {
          _or: [
            {
              // todo: this lookup doesn't work, check permissions
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
    if (data?.Users.length === 0) {
      return await insertNewUserRecord(member)
    } else {
      return await updateUserRecord(member)
    }
  }

  const insertNewUserRecord = async (member: ProjectMember) => {
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
    return insertUserRn.data.insert_Users.returning[0].id
  }

  const updateUserRecord = async (member: ProjectMember) => {
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
    return updateUserRn.data.update_Users.returning[0].id
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

  return { insertProjects, insertMembers, insertGrant }
}

export default useSaveGrant
