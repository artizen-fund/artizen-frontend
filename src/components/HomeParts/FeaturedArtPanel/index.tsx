import styled from 'styled-components'
import { Icon, TableAvatar } from '@components'
import { rgba, formatDate } from '@lib'
import { palette, typography } from '@theme'
import { IGrantsWithProjectFragment } from '@types'

type IFeaturedArtPanel = {
  grant?: IGrantsWithProjectFragment
  loading: boolean
}

const FeaturedArtPanel = ({ grant }: IFeaturedArtPanel) => {
  const artist = grant?.submission?.project?.members?.filter(m => m.type === 'lead')[0]

  return !grant ? (
    <></>
  ) : (
    <Wrapper>
      <Copy>
        <Metadata>
          <Metadatum>
            <Icon glyph="crown" color="slate" darkColor="moon" level={2} outline glyphOutline label="Top Donor Prize" />
          </Metadatum>
          <Metadatum>
            <Icon glyph="palette" color="slate" darkColor="moon" level={2} outline glyphOutline label="Artifact 27" />
          </Metadatum>
          <Metadatum>
            <Icon
              glyph="face"
              color="slate"
              darkColor="moon"
              level={2}
              outline
              glyphOutline
              label={`${artist?.user?.firstName} ${artist?.user?.lastName}`}
            />
          </Metadatum>
        </Metadata>
      </Copy>
      <P>{grant.submission?.project?.description}</P>
      <Impact>Impact</Impact>
      <P>{grant.submission?.project?.impact}</P>

      <ListHeader>Project</ListHeader>
      <List>
        <div>
          <dt>Season {grant.season}</dt>
          <dd>Extended Reality</dd>
        </div>
        <div>
          <dt>Started</dt>
          <dd>{formatDate(grant.submission?.project?.creationDate)}</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>{formatDate(grant.submission?.project?.completionDate)}</dd>
        </div>
      </List>

      {/* todo: waiting on @EK for data
      <ListHeader>Artifact</ListHeader>
      <List>
        <div>
          <dt>Minted</dt>
          <dd>createdAt</dd>
        </div>
        <div>
          <dt>Token</dt>
          <dd>{grant.submission?.artifacts[0]?.blockchainAddress}</dd>
        </div>
      </List>
      */}

      <ListHeader>Contributors</ListHeader>
      <List>
        {grant?.submission?.project?.members.map((member, index) => (
          <div key={`member-${index}`}>
            <dt>
              <TableAvatar profileImage={member.user?.profileImage} />
              {member?.user?.firstName} {member?.user?.lastName}
            </dt>
            <dd>{member.type}</dd>
          </div>
        ))}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

export default FeaturedArtPanel
