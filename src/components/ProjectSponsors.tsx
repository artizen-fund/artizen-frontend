import styled from 'styled-components'
import { useState } from 'react'
import { Glyph } from '@components'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_SUBMISSION_IN_MATCH_FUND } from '@gql'
import { typography } from '@theme'
import Link from 'next/link'
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

          sponsors.push(sponsor)
        })
      })
      setSponsor(sponsors)
    },
  })

  return (
    <Wapper>
      <Title>Sponsored by:</Title>
      <SponsorsWrapper>
        {sponsorsFilter && (
          <SponsorList>
            {sponsorsFilter?.map(sponsor => {
              console.log('sponsor  ', sponsor)
              return (
                <Link key={sponsor.id} href={sponsor.url} passHref={true}>
                  <Sponsor>
                    <SponsorLogo alt={sponsor.name} src={sponsor.logotype} />
                    {/* <SponsorName>{sponsor.name}</SponsorName> */}
                  </Sponsor>
                </Link>
              )
            })}
          </SponsorList>
        )}
      </SponsorsWrapper>
    </Wapper>
  )
}

const SponsorList = styled.div`
  display: flex;
`

const Sponsor = styled.div``

const SponsorLogo = styled.img`
  height: 70px;
`

const SponsorName = styled.div``

const SponsorsWrapper = styled.div``

const Wapper = styled.div`
  grid-template-areas: 'title laurels' 'stats stats';
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
`

const Title = styled.h4`
  ${typography.title.l4}
`

export default ProjectSponsors
