import { useState } from 'react'
import styled from 'styled-components'

import { Button, Table, TableCell, TableAvatar, Spinner, Glyph } from '@components'
import { aggregateDonators, rgba, assertFloat, useGnosis } from '@lib'
import { IOpenEditionsSubscription } from '@types'
import { palette, typography } from '@theme'
import { capitalize } from 'lodash'

interface ILeaderboard {
  openEditions?: IOpenEditionsSubscription
  isWinner: boolean
  count: number
  totalSales: number
  matchFundPooled: number
}

const DEFAULT_LIMIT = 3
const FIXED_PRECISION = 2

const Leaderboard = ({ openEditions, isWinner, count, totalSales, matchFundPooled }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  if (!openEditions) return <Spinner minHeight="65px" />

  const sideItem =
    aggregateDonators(openEditions).length < DEFAULT_LIMIT ? (
      <></>
    ) : (
      <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
        {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
      </Button>
    )

  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const spli80 = (80 * matchFundPooled) / 100
  //only winners get 20% of the match fund on top of their sales
  const split20 = (20 * matchFundPooled) / 100

  const getMatchFundMoney = (countH: number): number => {
    const split = totalSales > 0 ? (countH * 100) / totalSales : 0
    return (spli80 * split) / 100
  }

  const salesArtifacts = BASE_ARTIFACT_PRICE * count

  const sells = (salesArtifacts + getMatchFundMoney(count) + (isWinner ? split20 : 0)).toFixed(2)

  const title = (
    <div>
      <BiggerText>Ξ{sells} raised:</BiggerText>
      <Grey>&nbsp; Ξ{salesArtifacts} sales </Grey>
      <Green>+ Ξ{getMatchFundMoney(count).toFixed(FIXED_PRECISION)} match</Green>
      <Green> + Ξ{split20.toFixed(FIXED_PRECISION)} prize</Green>
    </div>
  )

  return (
    <StyledTable title={title} {...{ sideItem }}>
      <SubmissionsMarker id="submissionsMarker" />
      {aggregateDonators(openEditions).map((user, index) => (
        <StyledTableCell key={`donating-user-${index}`} highlight hidden={index > limit - 1}>
          <div>
            <TableAvatar profileImage={user.profileImage} />
            <Name>{capitalize(user?.artizenHandle)}</Name>
            {index === 0 && <StyledGlyph glyph="crown" level={1} color="black" darkColor="algae" />}
          </div>
          <div>
            <Grey>Ξ&nbsp;{BASE_ARTIFACT_PRICE * user.copies}</Grey>
            <Green>+&nbsp; Ξ&nbsp;{getMatchFundMoney(user.copies).toFixed(FIXED_PRECISION)}</Green>{' '}
            <Amount>
              <span> | minted</span> {user.copies}
            </Amount>
          </div>
        </StyledTableCell>
      ))}
    </StyledTable>
  )
}

const StyledGlyph = styled(props => <Glyph {...props} />)`
  --iconSize: 11px;
`

const SubmissionsMarker = styled.div`
  position: absolute;
  top: -80px;
  width: 1px;
  height: 1px;
`

const Grey = styled.span`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const BiggerText = styled.span`
  ${typography.label.l0}
`

const Green = styled.span`
  ${typography.label.l1}
  color: ${rgba(palette.algae)};
`

const StyledTable = styled(props => <Table {...props} />)`
  position: relative;
  margin: 24px 0;
`

const StyledTableCell = styled(props => <TableCell {...props} />)<{ hidden: boolean }>`
  &&& {
    display: ${props => (props.hidden ? 'none' : 'flex')};
  }
`

const Name = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    line-height: 1em;
  }
`

const Amount = styled.div`
  white-space: nowrap;
  span {
    color: ${rgba(palette.barracuda)};
  }
`

export default Leaderboard
