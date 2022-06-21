import { useState } from 'react'
import Shelf from './'
import { Button } from '@components'

export default {
  title: 'layout/Shelf',
  component: Shelf,
  argTypes: {},
}

export const ShelfComponent = (props: any) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Toggle Shelf</Button>
      <Shelf {...props} {...{ visible }} hideShelf={() => setVisible(!visible)}></Shelf>
    </>
  )
}
