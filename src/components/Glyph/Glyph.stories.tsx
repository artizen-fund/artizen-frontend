import Glyph, { GlyphProps } from './'
import { glyphKey, palette } from '@theme'

const story = {
  title: 'components/Glyph',
  component: Glyph,
  argTypes: {
    glyph: {
      options: glyphKey,
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
    darkColor: {
      options: [undefined, ...Object.keys(palette)],
      control: { type: 'select' },
    },
    level: {
      options: [0, 1, 2],
      control: { type: 'radio' },
    },
    size: {
      options: [12, 16, 20, 24],
      control: { type: 'radio' },
    },
  },
}
export default story

export const GlyphComponent = (props: GlyphProps) => <Glyph {...props} />
