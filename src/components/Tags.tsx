import styled from 'styled-components'
import { ButtonStyle, ButtonTypography } from './Button'
import { typography, breakpoint } from '@theme'
import { buttonColor } from './Button/Button.helpers'

const Tags = ({ tags }: { tags: Array<string> }) => (
  <Wrapper>
    {tags.map((tag, i) => (
      <Tag level={2} outline href="/" key={`tag-${i}`}>
        <span>{tag}</span>
      </Tag>
    ))}
  </Wrapper>
)

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin: 2em 0;
`

const Tag = styled.li`
  ${ButtonStyle}
  ${ButtonTypography}
  ${typography.label.l2}
  
  
  color: ${props => buttonColor('light', 'foreground', { ...props })};
  background-color: ${props => buttonColor('light', 'background', { ...props })};
  border-color: ${props => buttonColor('light', 'border', { ...props })};

  @media (prefers-color-scheme: dark) {
    color: ${props => buttonColor('dark', 'foreground', { ...props })};
    background-color: ${props => buttonColor('dark', 'background', { ...props })};
    border-color: ${props => buttonColor('dark', 'border', { ...props })};
  }

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0);

  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, ${props => (props.transparent ? 0 : 0.4)});
  }

  padding: 8px 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 8px 20px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 12px 24px;
  }

  border-radius: 9999px;
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 144dpi) {
    border-width: 0.5px;
  }

  cursor: default;
`

export default Tags
