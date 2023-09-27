import styled from 'styled-components'
import { Glyph, Button } from '@components'
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

  const split = totalSales > 0 ? (count * 100) / totalSales : 0

  const matchFundMoney = (spli80 * split) / 100

  const salesArtifacts = BASE_ARTIFACT_PRICE * count

  const showRaisedMoney: boolean = count > 0

  return (
    <Wrapper>
      {showRaisedMoney ? (
        <>
          <span>
            <AmountText>Ξ {(salesArtifacts + matchFundMoney + (isWinner ? split20 : 0)).toFixed(2)}</AmountText> raised
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

export default ArtifactCount
