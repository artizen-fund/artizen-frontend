import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba, assertFloat } from '@lib'
import { palette, typography } from '@theme'

//NEXT_PUBLIC_BASE_ARTIFACT_PRICE

const ArtifactCount = ({
  count,
  totalSales,
  matchFundPooled,
  isWinner,
}: {
  count: number
  totalSales: number
  matchFundPooled: number
  isWinner: boolean
}) => {
  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )
  //TODO: move this to a env variable

  const spli80 = (80 * matchFundPooled) / 100
  //only winners get 20% of the match fund on top of their sales
  const split20 = (20 * matchFundPooled) / 100

  console.log('count', count)
  console.log('totalSales:::', totalSales)

  const split = totalSales > 0 ? (count * 100) / totalSales : 0

  const matchFundMoney = (spli80 * split) / 100

  const salesArtifacts = BASE_ARTIFACT_PRICE * count

  console.log('totalSales  ', totalSales)
  console.log('matchFundPooled  ', matchFundPooled)

  console.log('isWinner  ', isWinner)
  console.log('split20  ', split20)
  console.log('spli80  ', spli80)
  console.log('the project split  ', split)
  console.log('the project matchFundMoney  ', matchFundMoney)
  console.log('the project salesArtifacts  ', salesArtifacts)

  const showRaisedMoney: boolean = count > 0

  return (
    <Wrapper>
      {showRaisedMoney ? (
        <>
          <span>
            <AmountText>Ξ {(salesArtifacts + matchFundMoney + (isWinner ? split20 : 0)).toFixed(2)}</AmountText> raised
          </span>
          <Glyph glyph="trend" level={2} color="barracuda" darkColor="barracuda" />
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
  color: ${rgba(palette.algae)};
`

export default ArtifactCount
