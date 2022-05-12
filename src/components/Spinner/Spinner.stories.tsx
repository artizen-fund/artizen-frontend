import Spinner, { SpinnerProps } from './'

export default {
  title: 'components/Spinner',
  component: Spinner,
  argTypes: {
    hidden: {
      control: 'boolean',
    },
  },
}

export const SpinnerComponent = (props: SpinnerProps) => <Spinner {...props} />
