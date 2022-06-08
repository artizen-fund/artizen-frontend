import FeaturedArt from './'

const story = {
  title: 'page/home/FeaturedArt',
  component: FeaturedArt,
  argTypes: {},
}
export default story

export const FeaturedArtComponent = (props: any) => {
  return <FeaturedArt {...props} />
}
