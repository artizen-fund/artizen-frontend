import styled from 'styled-components'
import { IGrantsWithProjectAndDonationsFragment } from '@types'
import { typography } from '@theme'

interface IGrantLayout {
  grant: IGrantsWithProjectAndDonationsFragment
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  const artifacts = grant.submission?.artifacts

  console.log('grant   ', grant)
  return (
    <>
      <GrantContentWrapper>
        <TextCntainer>
          Grant Date: <span> {grant.date}</span>
        </TextCntainer>
        <TextCntainer>
          Status: <span> {grant.status}</span>{' '}
        </TextCntainer>
        <TextCntainer>
          Project: <span> {grant.submission?.project?.title}</span>
        </TextCntainer>
        <TextCntainer>
          Project Description: <span> {grant.submission?.project?.description}</span>
        </TextCntainer>
        {/* <ArtifactsContainer>
          {artifacts?.map(({ edition, artwork, description, name }) => (
            <ArtifactItem key={edition}>
              <span>Artwork {edition} </span>
              <span>{description}</span>
              <span>{name} </span>
              <div
                style={{
                  width: 200,
                  height: 200,
                  margin: '5 5 5 5',
                  background: `url("${artwork}") no-repeat center center / contain`,
                }}
              ></div>
            </ArtifactItem>
          ))}
        </ArtifactsContainer> */}
      </GrantContentWrapper>
    </>
  )
}

const GrantContentWrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: block;
`

const TextCntainer = styled.div`
  margin: 10px 0;
  span {
    font-weight: 100;

    ${typography.title.l4}
  }
`

const ArtifactsContainer = styled.div``

const ArtifactItem = styled.div`
  float: left;
`

export default GrantLayout
