import styled from 'styled-components'
import { useState } from 'react'
import { Glyph } from '@components'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_SUBMISSION_IN_MATCH_FUND } from '@gql'
import { IGetSubmissionInMatchFundQuery } from '@types'
//getSubmissionInMatchFund

const ProjectSponsors = ({ projectId }: { projectId: string }) => {
  console.log('projectId  ', projectId)
  const [sponsorsFilter, setSponsor] = useState<Array<any>>()
  const { loading, data, error } = useQuery<IGetSubmissionInMatchFundQuery>(GET_SUBMISSION_IN_MATCH_FUND, {
    variables: {
      where: {
        matchFund: {
          submissions: {
            submission: {
              projectId: {
                _eq: projectId,
              },
            },
          },
        },
      },
    },
    onCompleted: data => {
      const sponsors: any[] = []

      data?.SubmissionInMatchFunds.forEach(({ submission, matchFund }) => {
        if (submission.project?.id !== projectId) {
          return []
        }
        console.log('matchFund  ', matchFund)

        matchFund?.sponsorInMatchFunds.forEach(({ sponsor }) => {
          if (sponsors.filter(({ id }) => id === sponsor?.id).length > 0) {
            return
          }

          if (sponsors.length === 0 && sponsor !== undefined) {
            sponsors.push(sponsor)
          }

          console.log('sponsors inside loop  ', sponsors)

          for (var i = 0, l = sponsors.length; i < l; i++) {
            if (sponsors[i].id === sponsor?.id) {
              return
            }
            sponsors.push(sponsor)
          }
        })
      })
      console.log('sponsors in here ', sponsors)
      setSponsor(sponsors)
    },
  })

  console.log('props here ', data?.SubmissionInMatchFunds)

  return (
    <Wapper>
      <Title>sds</Title>
      <SponsorsWrapper>
        {sponsorsFilter && (
          <SponsorList>
            {sponsorsFilter?.map(sponsor => {
              return (
                <Sponsor key={sponsor.id}>
                  <SponsorLogo src={sponsor.logo} />
                  <SponsorName>{sponsor.name}</SponsorName>
                </Sponsor>
              )
            })}
          </SponsorList>
        )}
      </SponsorsWrapper>
    </Wapper>
  )
}

const SponsorList = styled.div``

const Sponsor = styled.div``

const SponsorLogo = styled.img``

const SponsorName = styled.div``

const SponsorsWrapper = styled.div``

const Wapper = styled.div`
  display: grid;
  grid-template-areas: 'title laurels' 'stats stats';
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
`

const Title = styled.h2`
  grid-area: title;
  display: flex;
  flex-direction: row;
`

export default ProjectSponsors
