import Countdown, { CountdownProps } from './'

export default {
  title: 'page/home/Countdown',
  component: Countdown,
  argTypes: {},
}

export const CountdownComponent = (props: CountdownProps) => {
  return <Countdown {...props} />
}
