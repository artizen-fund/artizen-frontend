import { useApolloClient, useMutation } from '@apollo/client'
import moment from 'moment-timezone'
import { INSERT_GRANTS, INSERT_PROJECTS, INSERT_PROJECTS_MEMBERS, GET_USERS, CREATE_USERS, UPDATE_USERS } from '@gql'
import {
  IInsert_GrantsMutation,
  IInsert_ProjectsMutation,
  IInsert_ProjectMembersMutation,
  IGetUsersQuery,
  ICreateUsersMutation,
} from '@types'
import { FormState, Project, ProjectMember } from '@forms/createGrants'
import { mapArtifactsForDB, getGrantDates } from './'

const useSaveGrant = () => {
  const [insertGrantsM] = useMutation<IInsert_GrantsMutation>(INSERT_GRANTS)
  const [insertProjectsM] = useMutation<IInsert_ProjectsMutation>(INSERT_PROJECTS)
  const [insertProjectMemberInDB] = useMutation<IInsert_ProjectMembersMutation>(INSERT_PROJECTS_MEMBERS)

  // users
  const [insertUser] = useMutation<ICreateUsersMutation>(CREATE_USERS)
  const [updateUser] = useMutation(UPDATE_USERS)
  const apolloClient = useApolloClient()
  // note: we cannot use useLazyQuery() for GET_USERS as it does not cooperate with Promise.all()

  const insertProject = async (projectData: Project) => {
    const projectDBCreationReturn = await insertProjectsM({
      variables: {
        objects: {
          ...projectData,
          description: '',
          impactTags: projectData.impactTags
            ?.split(',')
            .map(tag => tag.trim())
            .join(','),
        },
      },
    })
    if (
      !projectDBCreationReturn.data?.insert_Projects ||
      projectDBCreationReturn.data?.insert_Projects.returning.length < 1
    ) {
      throw new Error('error creating project in DB')
    }
    return projectDBCreationReturn.data?.insert_Projects?.returning[0].id
  }

  const insertMembers = async (projectMembers: Array<ProjectMember>, projectId: string) => {
    return Promise.all(
      projectMembers.map(async (member: ProjectMember) => {
        const userId = await getUserRecord(member)
        const insertedMember = await insertProjectMemberInDB({
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
        return insertedMember
      }),
    )
  }

  const getUserRecord = async (member: ProjectMember) => {
    const { data } = await apolloClient.query<IGetUsersQuery>({
      query: GET_USERS,
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
    return data?.Users.length === 0 ? await insertNewUserRecord(member) : await updateUserRecord(member)
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
    if (!insertUserRn.data?.insert_Users || insertUserRn.data.insert_Users.returning.length < 1) {
      throw new Error('Error inserting new user to DB')
    }
    return insertUserRn.data.insert_Users.returning[0].id
  }

  const updateUserRecord = async (member: ProjectMember) => {
    const updateUserRn = await updateUser({
      variables: {
        where: {
          publicAddress: {
            _eq: member.wallet?.toLowerCase(),
          },
        },
        _set: {
          firstName: member.firstName,
          lastName: member.lastName,
          externalLink: member.externalLink,
        },
      },
    })
    if (!updateUserRn.data?.update_Users || updateUserRn.data.update_Users.returning.length < 1) {
      throw new Error('Error updating user in DB')
    }
    return updateUserRn.data.update_Users.returning[0].id
  }

  const insertGrant = async (data: FormState, projectId: string) => {
    const { length, ...etc } = data.grant
    const startingDate = moment(data.grant.startingDate)
    const [startingDateRaw, closingDateRaw] = getGrantDates(startingDate, length)
    const artifactsData = mapArtifactsForDB(data.artifacts)
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
    if (!insertGrantsReturn.data?.insert_Grants || insertGrantsReturn.data?.insert_Grants.returning.length < 1) {
      throw new Error('error creating grant in DB')
    }
    return insertGrantsReturn.data?.insert_Grants?.returning[0].id
  }

  return { insertProject, insertMembers, insertGrant }
}

export default useSaveGrant
