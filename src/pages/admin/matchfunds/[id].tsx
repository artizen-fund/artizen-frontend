import styled from 'styled-components'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { palette, typography } from '@theme'
import { PagePadding, CuratorCheck, Layout, Spinner, Button, Project } from '@components'
import { GET_MATCH_FUNDS, LOAD_SEASONS } from '@gql'
import { LayoutContext, rgba } from '@lib'
import { capitalCase } from 'capital-case'

import {
  IGetMatchFundsQuery,
  ISeasonFragment,
  ISponsorInMatchFundFragment,
  SponsorInMatchFundFragmentDoc,
} from '@types'

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
                <Title>Ξ {matchFund.goal}</Title>
                <Body>URL: {matchFund.url}</Body>
                <SponsorList>
                  Sponsors:
                  {matchFund.sponsorInMatchFunds.map((sponsorInMatchFundFragment: ISponsorInMatchFundFragment) => {
                    const {
                      id,
                      sponsor: { name, id: sponsorId, participation, logotype },
                    } = sponsorInMatchFundFragment

                    return (
                      <SponsorItem key={id}>
                        <img style={{ width: 200 }} src={logotype} />
                        <div>{capitalCase(name)}</div>
                        <div>{participation}</div>
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
  ${typography.title.l3}
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

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: ${palette.night};
`
