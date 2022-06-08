import Glyph, { GlyphProps } from './'
import { glyphKey } from '@theme'
import { palette } from '@theme'

export default {
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

export const GlyphComponent = (props: GlyphProps) => <Glyph {...props} />
