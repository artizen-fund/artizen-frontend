import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { IUsers, Maybe } from '@types'
import styled from 'styled-components'
import { palette } from '@theme'
import { LayoutContext, rgba } from '@lib'

import { CuratorCheck, Layout, NewProjectForm, Spinner, PagePadding, Button } from '@components'
import { initialState, FormState } from '@forms/createProjects'

const ProjectDetails = () => {
  const { status } = useSession()
  const { setVisibleModalWithAttrs, toggleModal } = useContext(LayoutContext)
  const [processing, setProcessing] = useState<boolean>(false)
  const [tempGenericProject, setTempGenericProject] = useState<FormState>(initialState)
  const [tempLeadMember, setTempLeadMember] = useState<IUsers>()

  useEffect(() => {
    console.log('tempGenericProject', tempGenericProject)
    console.log('tempLeadMember', tempLeadMember)
  }, [tempGenericProject, tempLeadMember])

  const saveProject = () => {
    // console.warn('saveProject')
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
                  Add New Project Lead
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
              addData={data => {
                //setTempGenericProject
                console.log('data in here:::::::', data)
              }}
              tempValue={tempGenericProject}
              processing={processing}
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
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
    color: ${rgba(palette.night, 0.6)};
  }
`

const LeadUserWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 220px 1fr;
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
    color: ${rgba(palette.night, 0.6)};
  }
`

export default ProjectDetails
