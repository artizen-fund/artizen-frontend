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
  Button,
  Icon,
  ApplyForFundingBlurb,
  Faq,
} from '@components'
import { rgba } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels, metrics } from '@copy/home'
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

  const artist = activeGrant?.submission?.project?.members?.filter(m => m.type === 'lead')[0]

  const artifactNumber = 1

  return (
    <Layout>
      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>
      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt grant={activeGrant} />
          <DescriptionBlock>
            <Copy>
              <Metadata>
                <Metadatum>
                  <Icon glyph="crown" level={2} outline glyphOutline label="Top Donor Prize" />
                </Metadatum>
                <Metadatum>
                  <Icon glyph="palette" level={2} outline glyphOutline label="Artifact 27" />
                </Metadatum>
                <Metadatum>
                  <Icon
                    glyph="face"
                    level={2}
                    outline
                    glyphOutline
                    label={`${artist?.user?.firstName} ${artist?.user?.lastName}`}
                  />
                </Metadatum>
              </Metadata>
            </Copy>
            <P>{activeGrant?.submission?.project?.description}</P>
            <Impact>Impact</Impact>
            <P>{activeGrant?.submission?.project?.impact}</P>

            <ListHeader>Project</ListHeader>
            <List>
              <div>
                <dt>Season One</dt>
                <dd>Extended Reality</dd>
              </div>
              <div>
                <dt>Started</dt>
                <dd>creationDate</dd>
              </div>
              <div>
                <dt>Completed</dt>
                <dd>completionDate</dd>
              </div>
            </List>

            <ListHeader>Artifact</ListHeader>
            <List>
              <div>
                <dt>Minted</dt>
                <dd>createdAt</dd>
              </div>
              <div>
                <dt>Token</dt>
                <dd></dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd></dd>
              </div>
            </List>

            <ListHeader>Contributors</ListHeader>
            <List>
              {activeGrant?.submission?.project?.members.map((member, index) => (
                <div key={`member-${index}`}>
                  <dt>
                    <Avatar profileImage={member.user?.profileImage} />
                    {member?.user?.firstName} {member?.user?.lastName}
                  </dt>
                  <dd>{member.type}</dd>
                </div>
              ))}
            </List>
          </DescriptionBlock>
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
      <Newsletter />
      <ApplyForFundingBlurb />
      <Faq />
      <Metrics {...{ metrics }} />
    </Layout>
  )
}

const Header = styled(props => <PagePadding {...props} />)`
  h1 {
    ${typography.title.l1};
  }
  h2 {
    margin-top: 0.5em;
    ${typography.body.l1};
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  position: relative;
  padding: 40px 24px;
  background: ${rgba(palette.moon)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate, 0.64)};
    border-width: 0.5px 0px;
    border-style: solid;
    border-color: rgba(114, 124, 140, 0.4);
  }
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

const DescriptionBlock = styled.div`
  grid-area: tabbedInfo;
  margin-top: 30px;
`

const Copy = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${typography.title.l4}
  margin: 1em 0;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 15px;
  ${typography.label.l1}
  margin-bottom: 24px;
`

const Metadatum = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
`

const P = styled.p`
  ${typography.body.l2}
`

const Impact = styled.h4`
  margin-top: 1em;
  ${typography.title.l4}
`

const ListHeader = styled.h4`
  ${typography.label.l1}
  margin: 1em 0;
`

const List = styled.dl`
  ${typography.label.l1}
  display: flex;
  flex-direction: column;
  gap: 4px;
  > div {
    background: ${rgba(palette.stone, 0.24)};
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    dt {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
    }
  }
`

const Avatar = styled.div<{
  profileImage?: any
}>`
  display: inline-block;
  width: 32px;
  height: 32px;
  min-width: 32px;

  background-image: url(${props => props.profileImage || '/assets/glyphs/face/20/outline.svg'});
  background-size: ${props => (props.profileImage ? 'cover' : 'auto')};
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 9999px;
  border: 2px solid ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    border-color: ${rgba(palette.slate)};
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
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
