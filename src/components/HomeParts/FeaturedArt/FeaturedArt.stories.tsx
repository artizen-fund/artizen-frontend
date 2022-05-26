import FeaturedArt from './'

export default {
  title: 'page/home/FeaturedArt',
  component: FeaturedArt,
  argTypes: {},
}

export const FeaturedArtComponent = (props: any) => {
  return <FeaturedArt {...props} />
}
