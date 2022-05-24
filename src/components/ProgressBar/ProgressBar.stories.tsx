import styled from 'styled-components'
import ProgressBar, { ProgressBarProps } from './'

export default {
  title: 'components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    children: {
      control: 'number',
    },
    noSmoothing: {
      control: 'boolean',
    },
  },
}

// note: this is just here so the progressbar doesn't go full-screen-width
const Wrapper = styled.div`
  position: relative;
  max-width: 500px;
`

export const ProgressBarComponent = (props: ProgressBarProps) => {
  return (
    <Wrapper>
      <ProgressBar {...props} />
    </Wrapper>
  )
}
