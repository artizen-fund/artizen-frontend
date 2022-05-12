import React from 'react'
import RadioSet, { RadioSetProps } from './'

export default {
  title: 'components/RadioSet',
  component: RadioSet,
  argTypes: {},
}

export const RadioSetComponent = (props: RadioSetProps) => {
  const [selected, setSelected] = React.useState<string>('')
  return <RadioSet {...props} options={['air', 'land', 'sea']} onClick={e => setSelected(e)} {...{ selected }} />
}
