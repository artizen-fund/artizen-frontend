import Countdown, { CountdownProps } from './'

const story = {
  title: 'page/home/Countdown',
  component: Countdown,
  argTypes: {},
}
export default story

export const CountdownComponent = (props: CountdownProps) => {
  return <Countdown {...props} />
}
