import { useState } from 'react'
import styled from 'styled-components'

import { Button, Table, TableCell, TableAvatar, Spinner, Glyph } from '@components'
import { aggregateDonators, rgba, assertFloat, titleCase, calculateSales } from '@lib'
import { IOpenEditionsSubscription } from '@types'
import { palette, typography, breakpoint } from '@theme'

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

  console.log('Leaderboard  openEditions ', openEditions)

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

  const { salesArtifacts, spli80, prize, totalAward, projectMatchFund, calculateMatchFundContribution } =
    calculateSales(isWinner, matchFundPooled, count, totalSales)

  // const salesArtifacts = BASE_ARTIFACT_PRICE * count

  // //add match to matchFundPooled
  // const spli80 = (80 * matchFundPooled) / 100
  // //only winners get 20% of the match fund on top of their sales
  // const split20 = (20 * matchFundPooled) / 100

  // const getMatchFundMoney = (countH: number): number => {
  //   const split = totalSales > 0 ? (countH * 100) / totalSales : 0
  //   console.log('this project split is: ', split)
  //   //split: 6*100/8 = 75%
  //   //spli80: 80*10/100 = 8
  //   return (spli80 * split) / 100
  // }

  // const sells = (salesArtifacts + getMatchFundMoney(count) + salesArtifacts + (isWinner ? split20 : 0)).toFixed(2)

  const title = (
    <div>
      <BiggerText>Ξ{totalAward} raised:</BiggerText>
      <Grey>&nbsp; Ξ{salesArtifacts} sales </Grey>
      <Green>+ Ξ{projectMatchFund} match</Green>
      {isWinner && <Green> + Ξ{prize} prize</Green>}
    </div>
  )

  return (
    <StyledTable title={title} {...{ sideItem }}>
      <SubmissionsMarker id="submissionsMarker" />
      {aggregateDonators(openEditions).map((user, index) => (
        <StyledTableCell key={`donating-user-${index}`} highlight hidden={index > limit - 1}>
          <div>
            <TableAvatar profileImage={user.profileImage} />
            <Name>{titleCase(user?.artizenHandle)}</Name>
            {index === 0 && <StyledGlyph glyph="crown" level={1} color="black" darkColor="algae" />}
          </div>
          <div>
            <Grey>Ξ&nbsp;{salesArtifacts}</Grey>
            <Green>+&nbsp; Ξ&nbsp;{calculateMatchFundContribution(user.copies)}</Green>{' '}
            <Amount>
              | <span> minted</span> {user.copies}
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

  @media only screen and (max-width: ${breakpoint.phablet}px) {
    span {
      display: none;
    }
  }
`

export default Leaderboard
