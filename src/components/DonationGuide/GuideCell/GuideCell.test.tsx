import renderer from 'react-test-renderer'
import GuideCell from './'
import { IGuideCell } from '../guide'

describe('GuideCell', () => {
  const sampleCell: IGuideCell = {
    columns: {
      desktop: 12,
      laptop: 12,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.48,
      laptop: 0.48,
      tablet: 0.5,
      phablet: 0.7,
      mobile: 1.4,
    },

    items: [
      /* 1. */ {
        type: 'copy',
        copy: 'First, if you’re stressed about web3, don’t. We got you. It’s easier than you think.',
        coordinates: {
          desktop: {
            x: 0,
            y: 35,
            w: 350,
          },
          laptop: {
            x: 0,
            y: 35,
            w: 450,
          },
          tablet: {
            x: 0,
            y: 20,
            w: 350,
          },
          phablet: {
            x: 0,
            y: 18,
            w: 200,
          },
          mobile: {
            x: 0,
            y: 32,
            w: 200,
          },
        },
      },
      {
        type: 'image',
        image: '01.png',
        imageDark: '01-dark.png',
        altText: 'fellow strutting with card and coin',
        coordinates: {
          desktop: {
            x: -1,
            y: -1,
            w: 55,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 55,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 60,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 80,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 90,
          },
        },
      },
    ],
  }

  it('renders correctly', () => {
    const tree = renderer.create(<GuideCell {...sampleCell} step={1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
