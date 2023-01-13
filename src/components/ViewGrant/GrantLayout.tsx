import styled from 'styled-components'
import { IGrantsWithProjectFragment } from '@types'
import { palette } from '@theme'
import { rgba } from '@lib'
import moment from 'moment-timezone'

interface IGrantLayout {
  grant: IGrantsWithProjectFragment
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  // const artifacts = grant.submission?.artifacts
  const startingDate = moment(grant.startingDate).format('MM-DD-YYYY HH:mm:ss')
  const closingDate = moment(grant.closingDate).format('MM-DD-YYYY HH:mm:ss')
  return (
    <>
      <List>
        <div>
          <dt>Project title</dt>
          <dd>{grant.submission?.project?.title}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{grant.status}</dd>
        </div>
        <div>
          <dt>Project Description</dt>
          <dd>{grant.submission?.project?.description}</dd>
        </div>
        <div>
          <dt>Project Starting Date</dt>
          <dd>{startingDate} PST</dd>
        </div>
        <div>
          <dt>Project Closing Date</dt>
          <dd>{closingDate} PST</dd>
        </div>

        {/* <ArtifactsContainer>
          {artifacts?.map(({ edition, artwork, description, name }) => (
            <ArtifactItem key={edition}>
              <dd>Artwork {edition} </dd>
              <dd>{description}</dd>
              <dd>{name} </dd>
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
      </List>
    </>
  )
}

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

export default GrantLayout
