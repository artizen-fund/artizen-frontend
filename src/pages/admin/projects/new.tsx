import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { IUsers, Maybe } from '@types'
import styled from 'styled-components'
import { palette } from '@theme'
import { LayoutContext, rgba } from '@lib'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { INSERT_PROJECTS } from '@gql'
import * as validateLib from 'wallet-address-validator'
import { ErrorObject } from 'ajv'
import { CuratorCheck, Layout, NewProjectForm, Spinner, PagePadding, Button } from '@components'
import { initialState, schema, FormState } from '@forms/createProjects'

const testWallet = (walletAddress: string) => {
  console.log('walletAddress', validateLib.validate(walletAddress, 'ETH'))

  const isValid = validateLib.validate(walletAddress, 'ETH')

  return !isValid
    ? {
        instancePath: '/project/walletAddress',
        message: 'Invalid blockchain address',
        schemaPath: '#/properties/walletAddress',
        keyword: '',
        params: {},
      }
    : null
}

const ProjectDetails = () => {
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])
  const { status } = useSession()
  const { push } = useRouter()
  const { setVisibleModalWithAttrs, toggleModal } = useContext(LayoutContext)

  const [tempGenericProject, setTempGenericProject] = useState<FormState>(initialState)
  const [tempLeadMember, setTempLeadMember] = useState<IUsers>()
  const [insertProject, { loading }] = useMutation(INSERT_PROJECTS)

  const saveProject = async () => {
    const { info1, info2, info3, info4, artworkArtifact, videoArtifact, ...project } = tempGenericProject

    const newProjectVars = {
      objects: [
        {
          artifacts: {
            data: [
              {
                artwork: artworkArtifact,
                video: videoArtifact,
              },
            ],
          },
          /* IMPORTANT: Generic description questions are subject
           to be changed quite a bit, that's why they are not in the schema 
          and grouped in a single as jsonb field */

          metadata: [
            {
              title: schema.properties?.info1.title,
              value: info1,
            },
            {
              title: schema.properties?.info2.title,
              value: info2,
            },
            {
              title: schema.properties?.info3.title,
              value: info3,
            },
            {
              title: schema.properties?.info4.title,
              value: info4,
            },
          ],

          members: {
            data: [
              {
                type: 'lead',
                userId: tempLeadMember?.id,
              },
            ],
          },
          ...project,
        },
      ],
    }

    const insertProjectR = await insertProject({
      variables: newProjectVars,
    })

    const {
      data: {
        insert_Projects: { returning },
      },
    } = insertProjectR

    if (returning.length > 0) {
      push(`/admin/projects/${returning[0].id}`)
    }

    console.log('insertProjectR   ', insertProjectR)
  }

  return (
    <Layout>
      <CuratorCheck />
      <PagePadding>
        {status !== 'authenticated' ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Title className="extent">New Project Form: </Title>
            <ProjectLeadMemberWrapper>
              <Subtitle>Project Lead *</Subtitle>
              {!tempLeadMember && (
                <AddProjectLeadBt
                  onClick={() => {
                    setVisibleModalWithAttrs('newProjectMemberModal', {
                      callback: (data: any) => {
                        console.log('data in here:::::::', data)
                        setTempLeadMember(data)
                        toggleModal()
                      },
                    })
                  }}
                >
                  Add Project Lead
                </AddProjectLeadBt>
              )}

              {tempLeadMember && (
                <>
                  <AddProjectLeadBt
                    onClick={() => {
                      setTempLeadMember(undefined)
                      setVisibleModalWithAttrs('newProjectMemberModal', {
                        callback: (data: any) => {
                          console.log('data in here:::::::', data)
                          setTempLeadMember(data)
                          toggleModal()
                        },
                      })
                    }}
                  >
                    Replace
                  </AddProjectLeadBt>

                  <LeadUserWrapper>
                    <AvatarImage profileImage={tempLeadMember.profileImage}></AvatarImage>
                    <Subtitle>{`Name: ${tempLeadMember.firstName} ${tempLeadMember.lastName}`}</Subtitle>
                    <Subtitle>{`Wallet: ${tempLeadMember.publicAddress}`}</Subtitle>
                    <Subtitle>{`Email: ${tempLeadMember.email}`}</Subtitle>
                    <Subtitle>{`Twitter: ${tempLeadMember.twitterHandle}`}</Subtitle>
                    <Subtitle>{`External Link: ${tempLeadMember.externalLink}`}</Subtitle>
                  </LeadUserWrapper>
                </>
              )}
            </ProjectLeadMemberWrapper>
            <NewProjectForm
              additionalErrors={additionalErrors}
              saveNewProject={saveProject}
              addData={data => {
                if (data.walletAddress && data.walletAddress?.length > 4) {
                  const error = testWallet(data.walletAddress)

                  console.log('error   ', error)

                  setAdditionalErrors(error ? [error] : [])

                  setTempGenericProject(data)
                } else {
                  setTempGenericProject(data)
                }
              }}
              tempValue={tempGenericProject}
              processing={loading}
            />
          </Wrapper>
        )}
      </PagePadding>
    </Layout>
  )
}

const AddProjectLeadBt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  height: 100%;
  background-color: ${rgba(palette.night)};
  color: ${rgba(palette.white)};
  cursor: pointer;
  border-radius: 99px;
  width: 50%;
  justify-self: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${rgba(palette.night)};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
    color: ${rgba(palette.barracuda)};
  }
`

const LeadUserWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 18px 18px 18px;
  grid-column: 1 / 3;
`

const ProjectLeadMemberWrapper = styled.div`
  margin: 42px 0 10px 0;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  background-color: ${rgba(palette.white, 1)};

  .doubleLength {
    grid-column: 1 / span 2;
  }
`

const AvatarImage = styled.div<{ profileImage?: Maybe<string> }>`
  width: 96px;
  height: 96px;
  background-image: url(${props => props.profileImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${rgba(palette.night)};
  grid-row: 1 / 4;
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
  }
`

const Wrapper = styled.div`
  width: 100%;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.white)};
  }
`

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.barracuda)};
  }
`

export default ProjectDetails