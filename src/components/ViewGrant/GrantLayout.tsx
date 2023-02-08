import { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useQuery } from '@apollo/client'
import { IGrantFragment, IDonationsQuery, IConfirmedDonatorsFragment } from '@types'
import { palette } from '@theme'
import { rgba, aggregateDonators } from '@lib'
import { GET_DONATIONS } from '@gql'

interface IGrantLayout {
  grant: IGrantFragment
}

const GrantLayout = ({ grant }: IGrantLayout) => {
  const { data: donations } = useQuery<IDonationsQuery>(GET_DONATIONS, {
    fetchPolicy: 'no-cache',
    variables: {
      whereDonations: {
        grantId: {
          _eq: grant.id,
        },
      },
      where: {
        donations: {
          _and: [
            {
              grantId: {
                _eq: grant.id,
              },
              status: {
                _eq: 'confirmed',
              },
            },
          ],
        },
      },
    },
  })

  const [winner, setWinner] = useState<IConfirmedDonatorsFragment>()
  useEffect(() => {
    if (!!donations && donations.Users.length > 0) {
      const aggregatedDonors = aggregateDonators(donations.Users)
      setWinner(aggregatedDonors[0])
    }
  }, [donations])

  const [clickedItem, setClickedItem] = useState<string>()

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
          <dt>Project Logline</dt>
          <dd>{grant.submission?.project?.logline}</dd>
        </div>
        <div>
          <dt>Project Starting Date</dt>
          <dd>{startingDate} PST</dd>
        </div>
        <div>
          <dt>Project Closing Date</dt>
          <dd>{closingDate} PST</dd>
        </div>

        {winner && (
          <>
            <CopyToClipboard text={`${winner.firstName} ${winner.lastName}`} onCopy={() => setClickedItem('name')}>
              <div>
                <dt>Top Donor</dt>
                <CopyTarget animated={clickedItem === 'name'}>{`${winner.firstName} ${winner.lastName}`}</CopyTarget>
              </div>
            </CopyToClipboard>
            <CopyToClipboard text={winner.email!} onCopy={() => setClickedItem('email')}>
              <div>
                <dt>Top Donor Email</dt>
                <CopyTarget animated={clickedItem === 'email'}>{winner.email}</CopyTarget>
              </div>
            </CopyToClipboard>
            <CopyToClipboard text={winner.publicAddress!} onCopy={() => setClickedItem('publicAddress')}>
              <div>
                <dt>Top Donor Wallet</dt>
                <CopyTarget animated={clickedItem === 'publicAddress'}>{winner.publicAddress}</CopyTarget>
              </div>
            </CopyToClipboard>
          </>
        )}

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

const CopyTarget = styled.dd<{ animated: boolean }>`
  @keyframes flash {
    0% {
      color: ${rgba(palette.slate)};
    }
    50% {
      color: ${rgba(palette.algae)};
    }
    100% {
      color: ${rgba(palette.slate)};
    }
  }
  @media (prefers-color-scheme: dark) {
    @keyframes flash {
      0% {
        color: ${rgba(palette.moon)};
      }
      50% {
        color: ${rgba(palette.algae)};
      }
      100% {
        color: ${rgba(palette.moon)};
      }
    }
  }
  cursor: pointer;
  ${props => props.animated && 'animation: flash 0.75s normal forwards ease-in-out;'}
`

export default GrantLayout
