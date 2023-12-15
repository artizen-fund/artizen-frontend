import styled from 'styled-components'
import { Glyph, Button } from '@components'
import { rgba, assertFloat, calculateSales } from '@lib'

import { palette, typography } from '@theme'

//NEXT_PUBLIC_BASE_ARTIFACT_PRICE

const ArtifactRaised = ({
  count,
  totalSales,
  matchFundPooled,
  isWinner,
  totalBase,
}: {
  count: number
  totalSales: number
  matchFundPooled: number
  isWinner: boolean
  totalBase?: number
}) => {
  // const BASE_ARTIFACT_PRICE = assertFloat(
  //   process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
  //   'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  // )

  // const salesArtifacts = BASE_ARTIFACT_PRICE * count

  // console.log('salesArtifacts', salesArtifacts)
  // //TODO: move this to a env variable
  // const matchFundPooledAndSales = matchFundPooled + totalSales * BASE_ARTIFACT_PRICE

  // console.log('matchFundPooledAndSales', matchFundPooledAndSales)
  // console.log('totalSales  ', totalSales)

  // const spli80 = (80 * matchFundPooledAndSales) / 100
  // //only winners get 20% of the match fund on top of their sales
  // const split20 = (20 * matchFundPooledAndSales) / 100

  // console.log('split20', split20)

  // const split = totalSales > 0 ? (count * 100) / totalSales : 0

  // const matchFundMoney = (spli80 * split) / 100

  // console.log('split  ', split)
  // console.log('matchFundMoney', matchFundMoney)

  const { totalAward } = calculateSales(isWinner, matchFundPooled, count, totalSales, totalBase || 0)

  const showRaisedMoney: boolean = count > 0

  return (
    <Wrapper>
      {showRaisedMoney ? (
        <>
          <span>
            <AmountText>Ξ {totalAward}</AmountText> raised
          </span>
          {/* <StyledButton glyph="info" glyphOnly onClick={() => {}} href={`https://twitter.com`} level={3} outline>
            info
          </StyledButton> */}
        </>
      ) : (
        <>
          <span>
            <AmountText>Ξ 0</AmountText> raised
          </span>
        </>
      )}
    </Wrapper>
  )
}

const StyledButton = styled(props => <Button {...props} />)`
  color: ${rgba(palette.algae)};
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};

  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -8px;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
  }
`

const AmountText = styled.span`
  bordercolor: ${rgba(palette.barracuda)};
  //color="barracuda" darkColor="barracuda"
`

export default ArtifactRaised
