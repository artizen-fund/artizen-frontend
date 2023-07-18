import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { faq } from '@copy/admin'
import { rgba, LayoutContext } from '@lib'
import styled from 'styled-components'
import { Button, Layout, Spinner, PagePadding, CuratorCheck, Faq, Breadcrumbs } from '@components'
import { GET_MATCH_FUNDS } from '@gql'
import { IGetMatchFundsQuery, IMatchFundFragment } from '@types'
import { palette, typography } from '@theme'
import { startCase } from 'lodash'

const MatchFunds = () => {
  const { query, push } = useRouter()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const {
    loading,
    data: loadedMatchFundsData,
    error: errorMatchFundsData,
  } = useQuery<IGetMatchFundsQuery>(GET_MATCH_FUNDS, {
    fetchPolicy: 'no-cache',
  })

  console.log('errorMatchFundsData  ', errorMatchFundsData)

  console.log('loadedMatchFundsData   ', loadedMatchFundsData)

  return (
    <Layout>
      <StyledPagePadding>
        <Breadcrumbs
          schema={[
            {
              path: '/admin',
              name: 'Admin',
              isActive: false,
            },
            {
              path: '/admin/matchfunds',
              name: 'Match Funds',
              isActive: true,
            },
          ]}
        />
        <CuratorCheck />
        {loading ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Header>Match Funds</Header>
            <Button
              level={2}
              onClick={() => {
                setVisibleModalWithAttrs('matchFundsModal', {})
              }}
            >
              Create New Match Fund
            </Button>
            <MatchFundList className="doubleLeght">
              {loadedMatchFundsData?.MatchFunds.map((matchFund: IMatchFundFragment) => {
                console.log('matchFund  ', matchFund)
                const sponsors = matchFund.sponsorInMatchFunds.map(
                  sponsorInMatchFund => sponsorInMatchFund.sponsor && startCase(sponsorInMatchFund.sponsor.name),
                )
                console.log('sponsors  ', sponsors)
                return (
                  <MatchFundWrapper key={matchFund.id} onClick={() => push(`/admin/matchfunds/${matchFund.id}`)}>
                    <Title>{startCase(matchFund.name)}</Title>
                    <Subtitle>{sponsors.toString()}</Subtitle>
                    {/* <SponsorLogotype src="sdasdasd" /> */}
                  </MatchFundWrapper>
                )
              })}
            </MatchFundList>
          </Wrapper>
        )}
      </StyledPagePadding>
      <div className="doubleWith">
        <Faq copy={faq} />
      </div>
    </Layout>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;
  align-items: center;

  .doubleLeght {
    grid-column: span 2;
  }
`

const MatchFundList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const MatchFundWrapper = styled.div`
  gap: 10px;
  width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
  cursor: pointer;
  padding: 1rem;
  background-color: ${rgba(palette.stone, 0.24)};
`

const Title = styled.div`
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`

const Subtitle = styled.div`
  ${typography.body.l1}
`

const SponsorLogotype = styled.img`
  grid-area: logotype;
`

export default MatchFunds
