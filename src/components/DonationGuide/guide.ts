import { ResponsiveSize } from '@theme'

type GuideCopy = {
  copy: string
  coordinates: Record<ResponsiveSize, { x: number; y: number }>
}
type GuideImage = {
  image: string
  imageDark?: string
  coordinates: Record<ResponsiveSize, { x: number; y: number; w?: number; h?: number }>
}
type GuideStep = {
  columns: Record<ResponsiveSize, number>
  items: Array<GuideCopy | GuideImage>
}
type GuideMap = Array<GuideStep>

const guideMap: GuideMap = [
  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 1. */ {
        copy: 'First, if you’re stressed about web3, don’t. We got you. It’s easier thank you think.',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-01.svg',
        imageDark: 'guide-01-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 2. */ {
        copy: 'The grants are funded using crypto. But you can donate using two payment methods:',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        copy: 'Your credit card (We’ll take care of turning your money to crypto, no worries) and Crypto (Polygon or Ethereum)',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-02.svg',
        imageDark: 'guide-02-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-02b.svg',
        imageDark: 'guide-02b-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 3. */ {
        copy: 'Let’s take a look at donating with credit card first!',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-03.svg',
        imageDark: 'guide-03-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 4. */ {
        copy: 'Select your donation amount. 100% goes to the grant but expect payment provider fees on top (we don’t charge any)',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-04.svg',
        imageDark: 'guide-04-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 5. */ {
        copy: 'Sign in (the process is exactly the same whether you’ve already donated or not.) There’s no password to set up and remember (phew!) ',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-05.svg',
        imageDark: 'guide-05-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 4,
      phablet: 4,
      mobile: 4,
    },

    items: [
      /* 6. */ {
        copy: 'You’ll get a confirmation email or text with a magic link (super secure!). Click on it.',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
      {
        image: 'guide-06.svg',
        imageDark: 'guide-06-dark.svg',
        coordinates: {
          desktop: {
            x: 50,
            y: 90,
          },
          laptop: {
            x: 0,
            y: 50,
          },
          tablet: {
            x: 0,
            y: 50,
          },
          phablet: {
            x: 0,
            y: 50,
          },
          mobile: {
            x: 0,
            y: 50,
          },
        },
      },
    ],
  },
]

export default guideMap
