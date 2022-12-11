import styled from 'styled-components'
import { IGrantsWithProjectAndDonationsFragment } from '@types'

interface IGrantLayout {
  grant: IGrantsWithProjectAndDonationsFragment
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  const artifact = grant.submission?.artifact
  return (
    <>
      <GrantContentWrapper>
        <TextCntainer>
          Grant Date: <span> {grant.date}</span>
        </TextCntainer>
        <TextCntainer>
          Status: <span> {grant.status}</span>{' '}
        </TextCntainer>
        <ArtifactsContainer>
          <ArtifactItem>
            <span>Artwork Community </span>
            <div
              style={{
                width: 200,
                height: 200,
                margin: '5 5 5 5',
                background: `url("${artifact?.artworkCommunity}") no-repeat center center / contain`,
              }}
            ></div>
          </ArtifactItem>

          <ArtifactItem>
            <span>Artwork Creator </span>
            <div
              style={{
                width: 200,
                height: 200,
                background: `url("${artifact?.artworkCreator}") no-repeat center center / contain`,
              }}
            ></div>
          </ArtifactItem>
          <ArtifactItem>
            <span>Artwork Patron </span>
            <div
              style={{
                width: 200,
                height: 200,
                background: `url("${artifact?.artworkPatron}") no-repeat center center / contain`,
              }}
            ></div>
          </ArtifactItem>
        </ArtifactsContainer>
      </GrantContentWrapper>
    </>
  )
}

const GrantContentWrapper = styled.div`
  width: 80%;
  display: block;
`

const TextCntainer = styled.div`
  span {
    font-weight: 100;
  }
`

const ArtifactsContainer = styled.div``

const ArtifactItem = styled.div`
  float: left;
`

export default GrantLayout
