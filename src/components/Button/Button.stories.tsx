import Button, { ButtonProps } from './'
import { iconKey } from '@theme'

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    outline: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    small: {
      control: 'boolean',
    },
    icon: {
      options: { '— none —': undefined, ...iconKey },
      control: { type: 'select' },
    },
  },
}

export const ButtonComponent = (props: ButtonProps) => (
  <Button onClick={() => alert('derp')} {...props}>
    Button
  </Button>
)

export const ButtonLinkComponent = (props: ButtonProps) => (
  <Button href="https://artizen.fund" target="_top" {...props}>
    Link
  </Button>
)
