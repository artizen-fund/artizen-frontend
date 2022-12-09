import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { LOAD_GRANTS } from '@gql'
import {
  FeaturedArt,
  Layout,
  Metrics,
  Newsletter,
  PagePadding,
  AlternatingPanels,
  AlternatingPanel,
  GrantsExplorer,
  Curators,
  Button,
} from '@components'
import { rgba, useTabbedInfo, Tabs, TabbedContent } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels, metrics, tabbedInfo } from '@copy/home'
import { ILoadGrantsQuery } from '@types'

const GrantPage = () => {
  const {
    query: { date },
  } = useRouter()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: date === undefined,
    variables: {
      where: {
        date: {
          _eq: date,
        },
      },
    },
  })

  const activeGrant = loadedGrantData?.Grants[0]

  return (
    <Layout>
      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>
      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt grant={activeGrant} />
          <TabbedInfoWrapper>
            <p>{activeGrant?.submission?.project?.description}</p>
            <h6>Impact</h6>
            <p>{activeGrant?.submission?.project?.impact}</p>

            <h6>Project</h6>
            <dl>
              <dt>Season One</dt>
              <dd>??</dd>
              <dt>Started</dt>
              <dd>creationDate</dd>
              <dt>Completed</dt>
              <dd>completionDate</dd>
            </dl>

            <h6>Project</h6>
            <dl>
              <dt>Minted</dt>
              <dd>createdAt</dd>
              <dt>Token</dt>
              <dd></dd>
              <dt>Address</dt>
              <dd></dd>
            </dl>

            <h6>Contributors</h6>
            <ul>
              {activeGrant?.submission?.project?.members.map((member, index) => (
                <li key={`member-${index}`}>
                  {member?.user?.firstName} {member?.user?.lastName}, {member.type}
                </li>
              ))}
            </ul>
          </TabbedInfoWrapper>
          <GrantsExplorer grant={activeGrant} />
        </Wrapper>
      </StyledPagePadding>
      <AlternatingPanels>
        {alternatingPanels.map((panel, i) => (
          <AlternatingPanel key={`panel-${i}`} {...panel}>
            <Button href={panel.destination} level={1}>
              {panel.buttonLabel}
            </Button>
          </AlternatingPanel>
        ))}
      </AlternatingPanels>
      <Curators />
      <Newsletter />
      <Metrics {...{ metrics }} />
    </Layout>
  )
}

const Header = styled(props => <PagePadding {...props} />)`
  h1 {
    ${typography.title.l1};
  }
  h2 {
    ${typography.body.l1};
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  position: relative;
  padding: 0;
`

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-areas: 'featuredArt' 'sidebar' 'tabbedInfo';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'featuredArt sidebar' 'tabbedInfo sidebar';
    grid-gap: 0px 30px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0px 80px;
  }
  padding-bottom: 100px;
`
// todo: above is just a filled-in value, check design

const Tab = styled.div<{ label: string }>``

const TabbedInfoWrapper = styled.div`
  grid-area: tabbedInfo;
`

const StyledTabbedContent = styled(props => <TabbedContent {...props} />)`
  h1 {
    ${typography.title.l2}
    margin-bottom: 0.125em;
  }
  h2 {
    ${typography.label.l1}
    color: ${rgba(palette.barracuda)};
    margin-bottom: 1em;
  }
  p,
  li {
    ${typography.body.l2}
    margin-bottom: 1em;
  }
`

const StyledTabs = styled(props => <Tabs {...props} />)`
  margin: 40px 0px 35px 0px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin: 50px 0px 45px 0px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    margin: 60px 0px 55px 0px;
  }
`

export default GrantPage

// import {
//   IInsert_GrantsMutation,
//   IInsert_ArtifactsMutation,
//   IInsert_ProjectsMutation,
//   IInsert_ProjectMembersMutation,
// } from '@types'

// const GrantPage = () => {
//   const {
//     push,
//     query: { date },
//   } = useRouter()

//   const {
//     loading,
//     data: loadedGrantData,
//     error: errorLoadingGrant,
//   } = useQuery(LOAD_GRANTS, {
//     skip: date === undefined,
//     variables: {
//       where: {
//         date: {
//           _eq: date,
//         },
//       },
//     },
//   })

//   console.log('errorLoadingGrant    ', errorLoadingGrant)
//   console.log('loadedGrantData ', loadedGrantData)

//   if (loadedGrantData) {
//     return <div>loading</div>
//   }

//   if (errorLoadingGrant) {
//     return <div>errorLoadingGrant</div>
//   }

//   return <>grant</>
// }

// export default GrantPage
