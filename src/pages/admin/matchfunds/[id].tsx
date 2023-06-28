import styled from 'styled-components'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { palette, typography } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button, Project } from '@components'
import { GET_MATCH_FUNDS } from '@gql'
import { LayoutContext, rgba } from '@lib'
import { capitalCase } from 'capital-case'

import { IGetMatchFundsQuery, ISponsorInMatchFundFragment, ISubmissionInMatchFundFragment } from '@types'

export default function MatchFundDetails(): JSX.Element {
  const { status } = useSession()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const {
    push,
    query: { id },
  } = useRouter()

  const {
    loading,
    data: loadedMatchFundData,
    error: errorMatchFund,
  } = useQuery<IGetMatchFundsQuery>(GET_MATCH_FUNDS, {
    skip: !id,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  })

  if (!loading && errorMatchFund) {
    console.log('errorMatchFund  ', errorMatchFund)
    throw new Error('error loading match fund details', errorMatchFund)
  }

  if (!loading && !loadedMatchFundData) {
    return <div>Match Fund not found</div>
  }

  const matchFund = loadedMatchFundData?.MatchFunds[0]

  console.log('matchFund  ', matchFund)

  return (
    <Layout>
      <CuratorCheck />
      <StyledPagePadding>
        {status !== 'authenticated' || loading ? (
          <Spinner minHeight="75vh" />
        ) : (
          <MatchFundWrapper>
            {matchFund && (
              <MatchFundContainer>
                <Title>{capitalCase(matchFund.name)}</Title>
                <Body>
                  URL: <a href={matchFund.url}>{matchFund.url}</a>
                </Body>

                <SponsorList>
                  Sponsors List:
                  {matchFund.sponsorInMatchFunds.map((sponsorInMatchFundFragment: ISponsorInMatchFundFragment) => {
                    const { id, sponsor } = sponsorInMatchFundFragment

                    return (
                      <SponsorItem key={id}>
                        <img style={{ width: 200 }} src={sponsor?.logotype} />
                        <div>{sponsor?.name && capitalCase(sponsor?.name)}</div>
                        <div>{sponsor?.participation}</div>
                      </SponsorItem>
                    )
                  })}
                </SponsorList>
                <Button
                  level={2}
                  outline
                  onClick={() => {
                    console.log('matchFund  ', matchFund)
                    setVisibleModalWithAttrs('addSponsorToMatchFund', {
                      matchFund,
                    })
                  }}
                >
                  Add Sponsor
                </Button>
                <SupportedProjectList>
                  <span>Projects List:</span>

                  {matchFund.submissions.map((submission: ISubmissionInMatchFundFragment) => {
                    const project = submission.submission?.project

                    return (
                      <div
                        key={submission?.id}
                        style={{ background: 'white', padding: '16px', margin: '16px 0', cursor: 'pointer' }}
                        onClick={() => push(`/admin/projects/${project?.id}`)}
                      >
                        {project && (
                          <Project
                            displayType="brief"
                            projectData={project}
                            // onClick={() => {
                            //   push(`/admin/projects/${project.id}`)
                            // }}
                          />
                        )}
                      </div>
                    )
                  })}
                  <AddProjectBt
                    level={2}
                    outline
                    onClick={() => {
                      console.log('matchFund  ', matchFund)
                      push(`/admin/projects`)
                      // setVisibleModalWithAttrs('addProjectsToMatchFund', {
                      //   matchFund,
                      // })
                    }}
                  >
                    Add Projects
                  </AddProjectBt>
                </SupportedProjectList>
              </MatchFundContainer>
            )}
          </MatchFundWrapper>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const Body = styled.div`
  ${typography.body.l3}
`

const SponsorList = styled.div`
  ${typography.title.l4}
`

const Title = styled.h1`
  ${typography.title.l2}
`

const SupportedProjectList = styled.div`
  ${typography.title.l4}
`

const SponsorItem = styled.div`
  display: grid;
  padding: 10px;
  ${typography.body.l3}
  background: ${rgba(palette.white)};
  margin: 16px 0;
`

const MatchFundWrapper = styled.div`
  background: ${rgba(palette.white)};
  padding: 20px;

  background-color: ${rgba(palette.stone, 0.24)};
  ${typography.body.l3}

  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`

const AddProjectBt = styled(props => <Button {...props} />)`
  width: 100%;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

const MatchFundContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(30px);
  grid-gap: 20px;
  margin: 20px 0;

  .expand {
    grid-column: 1 / 3;
  }
`
