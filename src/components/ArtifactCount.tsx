import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba, assertFloat } from '@lib'
import { palette, typography } from '@theme'

//NEXT_PUBLIC_BASE_ARTIFACT_PRICE

const ArtifactCount = ({ count }: { count: number }) => {
  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )
  //TODO: move this to a env variable
  const MachtfundToUp = 0.1 * count

  const totalSales = BASE_ARTIFACT_PRICE * count

  return (
    <Wrapper>
      <span>
        <AmountText>{MachtfundToUp + totalSales}</AmountText> raised
      </span>
      <Glyph glyph="trend" level={2} color="barracuda" darkColor="barracuda" />
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
