import styled from 'styled-components'

interface IGrantLayout {
  grant: Grant
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  console.log('grant  ', grant)
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
            {/* <ArtifactItem>
            <span>Artwork Creator </span>
            {artifact?.artworkCreator}
          </ArtifactItem>
          <ArtifactItem>
            <span>Artwork Patron </span>
            {artifact?.artworkPatron}
          </ArtifactItem> */}
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
