import Badge, { BadgeProps } from './'
import styled from 'styled-components'

export default {
  title: 'components/Badge',
  component: Badge,
  argTypes: {
    num: {
      control: 'number',
    },
    stroke: {
      control: 'boolean',
    },
  },
}

// note: this is just here so the badge isn't lost in the right corner
const Wrapper = styled.div`
  position: relative;
  width: 50px;
`

export const BadgeComponent = (props: BadgeProps) => (
  <Wrapper>
    <Badge {...props} />
  </Wrapper>
)
