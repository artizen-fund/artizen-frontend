import { Button } from '@components'
import { glyphKey } from '@theme'

const DonateButton = ({ active, ...props }: { active: boolean }) => {
  return (
    <Button
      glyph={active ? glyphKey.cross : glyphKey.donate}
      level={1}
      {...props}
      outline={active}
      glyphOnRight={active}
    >
      {active && 'Close'}
      {!active && 'Donate'}
    </Button>
  )
}

export default DonateButton
