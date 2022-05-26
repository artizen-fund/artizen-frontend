import Countdown, { CountdownProps } from './'

export default {
  title: 'homeParts/Countdown',
  component: Countdown,
  argTypes: {},
}

export const CountdownComponent = (props: CountdownProps) => {
  return <Countdown {...props} />
}
