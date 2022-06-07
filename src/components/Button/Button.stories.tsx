import Button, { ButtonProps } from './'
import { glyphKey } from '@theme'

const story = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    outline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    level: {
      options: [0, 1, 2],
      control: { type: 'select' },
    },
    glyph: {
      options: { '— none —': undefined, ...glyphKey },
      control: { type: 'select' },
    },
  },
}
export default story

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
