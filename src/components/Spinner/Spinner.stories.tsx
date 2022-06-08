import Spinner, { SpinnerProps } from './'

const story = {
  title: 'components/Spinner',
  component: Spinner,
  argTypes: { hidden: { control: 'boolean' } },
}
export default story

export const SpinnerComponent = (props: SpinnerProps) => <Spinner {...props} />
