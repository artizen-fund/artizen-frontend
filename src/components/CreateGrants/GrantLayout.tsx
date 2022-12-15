import styled from 'styled-components'
import { IGrantsWithProjectFragment } from '@types'
import { typography } from '@theme'
import moment from 'moment-timezone'

interface IGrantLayout {
  grant: IGrantsWithProjectFragment
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  const artifacts = grant.submission?.artifacts
  const startingDate = moment(grant.startingDate).format('MM-DD-YYYY HH:mm:ss')
  const closingDate = moment(grant.closingDate).format('MM-DD-YYYY HH:mm:ss')

  const startTime = moment.tz(grant.startingDate, 'America/Los_Angeles').unix()
  const startTimeF = moment(grant.startingDate).unix()
  const endTime = moment.tz(grant.startingDate, 'America/Los_Angeles').unix()

  console.log('startTime  ', startTime)
  console.log('startTime final ', startTimeF)

  console.log('grant   ', grant)
  return (
    <>
      <GrantContentWrapper>
        <TextCntainer>
          Project Starting Date: <span> {startingDate} PST</span>
        </TextCntainer>
        <TextCntainer>
          Project Closing Date: <span> {closingDate} PST</span>
        </TextCntainer>
        <TextCntainer>
          Status: <span> {grant.status}</span>{' '}
        </TextCntainer>
        <TextCntainer>
          Project title: <span> {grant.submission?.project?.title}</span>
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
  margin: 20px auto;
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
