import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { faq } from '@copy/admin'
import { useRouter } from 'next/router'
import { rgba, LayoutContext, useCloudinary } from '@lib'
import styled from 'styled-components'
import { Button, Layout, Spinner, Table, TableCell, PagePadding, CuratorCheck, Faq, Breadcrumbs } from '@components'
import { GET_SPONSORS } from '@gql'
import { IProjectsQuery, ISponsorFragment } from '@types'
import { palette, typography } from '@theme'
import { startCase } from 'lodash'

const Sponsors = () => {
  const { addParamsToLink } = useCloudinary()
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const { push } = useRouter()
  const {
    loading,
    data: loadedSponsorData,
    error: errorSponsorData,
  } = useQuery(GET_SPONSORS, {
    fetchPolicy: 'no-cache',
  })

  if (errorSponsorData) {
    console.error('errorSponsorData', errorSponsorData)
    return <div>Error loading sponsors</div>
  }

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
              path: '/admin/sponsors',
              name: 'Sponsors',
              isActive: true,
            },
          ]}
        />
        <CuratorCheck />
        {loading ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Header>Sponsors List</Header>
            <Button
              level={2}
              onClick={() => {
                setVisibleModalWithAttrs('sponsorModal', {})
              }}
            >
              Create New Sponsor
            </Button>
            <SponsorList className="doubleLeght">
              {loadedSponsorData?.Sponsors.map((sponsor: ISponsorFragment) => {
                return (
                  <SponsorWrapper key={sponsor.id}>
                    <SponsorTitle>{startCase(sponsor.name)}</SponsorTitle>
                    <SponsorFinance>{sponsor.participation}</SponsorFinance>
                    <SponsorURL href={sponsor.url} target="_blank">
                      Sponsor Url
                    </SponsorURL>
                    <SponsorLogotype src={addParamsToLink(sponsor.logotype, 'w_200,c_fill', 'image')} />
                    <AddToMatchBT stretch outline level={2} onClick={() => push('/admin/matchfunds')}>
                      Add Sponsor to Match Fund
                    </AddToMatchBT>
                  </SponsorWrapper>
                )
              })}
            </SponsorList>
          </Wrapper>
        )}
      </StyledPagePadding>
      <div className="doubleWith">
        <Faq copy={faq} />
      </div>
    </Layout>
  )
}

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
  grid-template-columns: 1fr 200px 200px;
  grid-template-areas: 'title title finance' 'logotype url url' 'button button button';
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

const AddToMatchBT = styled(props => <Button {...props} />)`
  grid-area: button;
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

const SponsorURL = styled.a`
  grid-area: url;
  text-align: right;
  text-decoration: underline;
  ${typography.body.l1}
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

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

export default Sponsors
