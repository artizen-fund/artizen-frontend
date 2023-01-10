import { useState } from 'react'
import styled from 'styled-components'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { Icon, TableAvatar, Shimmer, Button } from '@components'
import { rgba, formatDate, ARTIZEN_CURRENT_SEASON_NAME } from '@lib'
import { palette, typography } from '@theme'
import { IGrantsWithProjectFragment } from '@types'

type IFeaturedArtPanel = {
  grant?: IGrantsWithProjectFragment
  loading: boolean
}

const FeaturedArtPanel = ({ grant, loading }: IFeaturedArtPanel) => {
  const [closed, setClosed] = useState(true)
  const artist = grant?.submission?.project?.members?.filter(m => m.type === 'lead')[0]
  const artistName = !!grant ? `${artist?.user?.firstName} ${artist?.user?.lastName}` : ' '

  return (
    <Wrapper>
      <Copy>
        <Metadata>
          <Metadatum>
            <Icon
              loading={loading || !grant}
              glyph="crown"
              color="slate"
              darkColor="moon"
              level={2}
              outline
              glyphOutline
              label="Top Donor Prize"
            />
          </Metadatum>
          {/*<Metadatum>
            <Icon
              loading={loading || !grant}
              glyph="palette"
              color="slate"
              darkColor="moon"
              level={2}
              outline
              glyphOutline
              label="Artifact 27"
            />
          </Metadatum>*/}
          <Metadatum>
            <Icon
              loading={loading || !grant}
              glyph="face"
              color="slate"
              darkColor="moon"
              level={2}
              outline
              glyphOutline
              label={artistName}
            />
          </Metadatum>
        </Metadata>
      </Copy>

      {!grant ? (
        <Shimmer />
      ) : (
        <>
          <P>{grant?.submission?.project?.description}</P>
          <Impact>Impact</Impact>
          <P>{grant?.submission?.project?.impact}</P>
          <SlideDown closed={!closed}>
            <StyledButton level={2} onClick={() => setClosed(false)} stretch outline>
              view more
            </StyledButton>
          </SlideDown>
        </>
      )}

      <CopyWrapper>
        <ViewMore {...{ closed }}>
          <ListHeader>Project</ListHeader>
          <List>
            <div>
              <dt>Started</dt>
              <dd>{formatDate(grant?.submission?.project?.creationDate)}</dd>
            </div>
            <div>
              <dt>Completed</dt>
              <dd>{formatDate(grant?.submission?.project?.completionDate)}</dd>
            </div>
          </List>

          <ListHeader>Artifact</ListHeader>
          <List>
            <div>
              <dt>Season {grant?.season}</dt>
              <dd>{ARTIZEN_CURRENT_SEASON_NAME}</dd>
            </div>
            <div>
              <dt>Minted</dt>
              <dd>{formatDate(grant?.submission?.artifacts[0]?.createdAt)}</dd>
            </div>
            {/*<div>
              <dt>Token</dt>
              <dd>{grant?.submission?.artifacts[0]?.blockchainAddress}</dd>
            </div>*/}
          </List>

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
          <StyledButton level={2} onClick={() => setClosed(true)} stretch outline>
            view less
          </StyledButton>
        </ViewMore>
      </CopyWrapper>
    </Wrapper>
  )
}

const ViewMore = styled(props => <SlideDown {...props} />)<{ collapsed: boolean }>``

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
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
`

const P = styled.p`
  ${typography.body.l2}
  min-height: 50px;
`

const Impact = styled.h4`
  margin-top: 1em;
  ${typography.title.l4}
`

const ListHeader = styled.h4`
  ${typography.label.l1}
  padding: 1em 0;
`

const CopyWrapper = styled.div`
  margin: 1em 0;
`

const List = styled.dl`
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

const StyledButton = styled(props => <Button {...props} />)`
  margin-top: 2em;
`

export default FeaturedArtPanel
