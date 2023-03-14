import styled from 'styled-components'
import { Glyph } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'

const ArtifactCount = ({ count }: { count: number }) => (
  <Wrapper>
    <span>{count} minted</span> <Glyph glyph="trend" level={2} color="barracuda" />
  </Wrapper>
)

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
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
export default ArtifactCount
