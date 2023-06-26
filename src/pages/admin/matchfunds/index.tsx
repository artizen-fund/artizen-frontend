import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import { rgba, LayoutContext } from '@lib'
import styled from 'styled-components'
import { Button, Layout, Spinner, PagePadding, CuratorCheck } from '@components'
import { GET_MATCH_FUNDS } from '@gql'
import { IGetMatchFundsQuery, IMatchFundFragment } from '@types'
import { palette, typography } from '@theme'

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
              Add New Match Fund
            </Button>
            <SponsorList className="doubleLeght">
              {loadedMatchFundsData?.MatchFunds.map((matchFund: IMatchFundFragment) => {
                return (
                  <SponsorWrapper key={matchFund.id} onClick={() => push(`/admin/matchfunds/${matchFund.id}`)}>
                    <SponsorTitle>{matchFund.name}</SponsorTitle>
                    {/* <SponsorLogotype src="sdasdasd" /> */}
                  </SponsorWrapper>
                )
              })}
            </SponsorList>
          </Wrapper>
        )}
      </StyledPagePadding>
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

const SponsorList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const SponsorWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas: 'title title finance' 'logotype logotype url';
  width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
  cursor: pointer;
  padding: 1rem;
  background-color: ${rgba(palette.stone, 0.24)};

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`
const SponsorFinance = styled.div`
  grid-area: finance;
  text-align: right;
`

const SponsorTitle = styled.div`
  grid-area: title;
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`

const SponsorLogotype = styled.img`
  grid-area: logotype;
`

export default MatchFunds
