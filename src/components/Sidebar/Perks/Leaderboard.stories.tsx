import Perks from './'

const story = {
  title: 'page/home/Perks',
  component: Perks,
  argTypes: {},
}
export default story

export const PerksComponent = (props: any) => {
  return <Perks {...props} />
}
