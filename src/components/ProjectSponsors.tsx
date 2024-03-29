import styled from 'styled-components'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_SUBMISSION_IN_MATCH_FUND } from '@gql'
import { typography } from '@theme'
import Link from 'next/link'
import { IGetSubmissionInMatchFundQuery } from '@types'
// import ContainerDimensions from 'react-container-dimensions'
import { useElementSize } from 'usehooks-ts'
//getSubmissionInMatchFund

const ProjectSponsors = ({ projectId }: { projectId: string }) => {
  const [sponsorsFilter, setSponsor] = useState<Array<any>>()
  const [squareRef, { width, height }] = useElementSize()
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
      console.log('data :::::: ', data)
      console.log('projectId   ', projectId)
      const sponsors: any[] = []

      data?.SubmissionInMatchFunds.forEach(({ submission, matchFund }) => {
        if (submission?.project?.id !== projectId) {
          return []
        }

        matchFund?.sponsorInMatchFunds.forEach(({ sponsor }) => {
          if (sponsors.filter(({ id }) => id === sponsor?.id).length > 0) {
            return
          }

          console.log('here  sponsorInMatchFunds  :::::')

          sponsors.push(sponsor)
        })
      })
      setSponsor(sponsors)
    },
  })

  console.log('width  :::', width)

  console.log('sponsorsFilter  ', sponsorsFilter)

  return (
    <Wapper>
      {sponsorsFilter && sponsorsFilter.length > 0 && (
        <>
          <Title>Sponsored by:</Title>
          <SponsorsWrapper ref={squareRef}>
            <SponsorList width={width}>
              {sponsorsFilter?.map(sponsor => {
                return (
                  <SponsorItem key={sponsor.id}>
                    <Link key={sponsor.id} href={sponsor.url} passHref={true}>
                      <Sponsor>
                        <SponsorLogo alt={sponsor.name} src={sponsor.logotype} />
                        {/* <SponsorName>{sponsor.name}</SponsorName> */}
                      </Sponsor>
                    </Link>
                  </SponsorItem>
                )
              })}
            </SponsorList>
          </SponsorsWrapper>
        </>
      )}
    </Wapper>
  )
}

const SponsorsWrapper = styled.div`
  // display: flex;
  // width: 300px;
  text-align: center;
  overflow: hidden;
  max-width: 100%;
`

const SponsorItem = styled.div`
  margin: 0 8px 0 0;
`

const Sponsor = styled.div`
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`

const SponsorLogo = styled.img`
  height: 70px;
`

const SponsorName = styled.div``

// const SponsorsWrapper = styled.div``

const Wapper = styled.div`
  max-width: 100%;
`

const SponsorList = styled.div<{ width: number }>`
  width: ${props => props.width}px;
  overflow: scroll;
  display: flex;
`

const Title = styled.h4`
  ${typography.title.l4}
`

export default ProjectSponsors
