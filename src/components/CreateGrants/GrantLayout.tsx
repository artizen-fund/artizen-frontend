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
        <ArtifactsContainer>
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
        </ArtifactsContainer>
      </GrantContentWrapper>
    </>
  )
}

const GrantContentWrapper = styled.div`
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  display: block;
`

const TextCntainer = styled.div`
  span {
    font-weight: 100;
    display: block;
    ${typography.title.l4}
  }
`

const ArtifactsContainer = styled.div``

const ArtifactItem = styled.div`
  float: left;
`

export default GrantLayout
