import { useState, useContext } from 'react'
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
            <Title className="extent">New Project</Title>
            <NewProjectForm addData={setTempGenericProject} tempValue={tempGenericProject} processing={processing} />
            <ProjectLeadMemberWrapper>
              <Title>Project Lead:</Title>
              {!tempLeadMember && (
                <Button
                  level={3}
                  onClick={() => {
                    setVisibleModalWithAttrs('newProjectMemberModal', {
                      callback: (data: any) => {
                        console.log('data in here:::::::', data)
                        setTempLeadMember(data)
                        toggleModal()
                      },
                    })
                  }}
                  stretch
                >
                  Add New Project Lead
                </Button>
              )}

              {tempLeadMember && (
                <>
                  <Button
                    level={4}
                    glyph="cross"
                    stretch
                    outline
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
                  </Button>

                  <LeadUserWrapper>
                    <AvatarImage profileImage={tempLeadMember.profileImage}></AvatarImage>
                    <LeadUserItem>{`Name: ${tempLeadMember.firstName} ${tempLeadMember.lastName}`}</LeadUserItem>
                    <LeadUserItem>{`Wallet: ${tempLeadMember.publicAddress}`}</LeadUserItem>
                    <LeadUserItem>{`Email: ${tempLeadMember.email}`}</LeadUserItem>
                    <LeadUserItem>{`Twitter: ${tempLeadMember.twitterHandle}`}</LeadUserItem>
                    <LeadUserItem>{`External Link: ${tempLeadMember.externalLink}`}</LeadUserItem>
                  </LeadUserWrapper>
                </>
              )}
            </ProjectLeadMemberWrapper>
            <StyledButton onClick={saveProject} stretch level={0}>
              {/* {processing ? 'Saving...' : 'Save Draft'} */}
            </StyledButton>
          </Wrapper>
        )}
      </PagePadding>
    </Layout>
  )
}

const LeadUserItem = styled.div``

const LeadUserWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;

  grid-column: 1 / 3;
`

const ProjectLeadMemberWrapper = styled.div`
  margin: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
  padding-right: 260px;
  .doubleLength {
    grid-column: 1 / span 2;
  }
`

const AvatarImage = styled.div<{ profileImage?: Maybe<string> }>`
  width: 164px;
  height: 164px;
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

const StyledButton = styled(props => <Button {...props} />)`
  grid-column: 1 / span 12;
  margin-top: 20px;
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
    color: ${rgba(palette.moon)};
  }
`

export default ProjectDetails
