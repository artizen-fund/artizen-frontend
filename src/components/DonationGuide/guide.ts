import { ResponsiveSize } from '@theme'

export type GuideCoordinate = Record<ResponsiveSize, { x: number; y: number; w?: number; h?: number }>

type GuideCopy = {
  type: 'copy'
  copy: string
  coordinates: GuideCoordinate
}

type GuideImage = {
  type: 'image'
  image: string
  imageDark?: string
  altText?: string
  coordinates: GuideCoordinate
}

type GuideAnimation = {
  type: 'animation'
  lottieJson: string
  lottieJsonDark?: string
  altText?: string
  coordinates: GuideCoordinate
}

export type IGuideCell = {
  columns: Record<ResponsiveSize, number>
  height: Record<ResponsiveSize, number>
  items: Array<GuideCopy | GuideImage | GuideAnimation>
}

const guideMap: Array<IGuideCell> = [
  {
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
  },

  {
    columns: {
      desktop: 12,
      laptop: 12,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.25,
      laptop: 0.25,
      tablet: 0.4,
      phablet: 0.45,
      mobile: 0.9,
    },

    items: [
      /* 2. */ {
        type: 'copy',
        copy: 'The grants are funded using crypto. But you can donate using two payment methods:',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 490,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 490,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 400,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 270,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 270,
          },
        },
      },
      {
        type: 'copy',
        copy: 'Your credit card (We’ll take care of turning your money to crypto, no worries) and Crypto (Polygon or Ethereum).',
        coordinates: {
          desktop: {
            x: 0,
            y: -10,
            w: 360,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 360,
          },
          tablet: {
            x: -1,
            y: 10,
            w: 360,
          },
          phablet: {
            x: -1,
            y: 10,
            w: 280,
          },
          mobile: {
            x: -1,
            y: 27,
            w: 250,
          },
        },
      },
      {
        type: 'image',
        image: '02a.png',
        imageDark: '02a-dark.png',
        coordinates: {
          desktop: {
            x: 33,
            y: -1,
            w: 35,
          },
          laptop: {
            x: 40,
            y: -5,
            w: 30,
          },
          tablet: {
            x: 0,
            y: -1,
            w: 50,
          },
          phablet: {
            x: 0,
            y: -5,
            w: 50,
          },
          mobile: {
            x: 0,
            y: -10,
            w: 55,
          },
        },
      },
      {
        type: 'image',
        image: '02b.png',
        imageDark: '02b-dark.png',
        coordinates: {
          desktop: {
            x: -1,
            y: 0,
            w: 30,
          },
          laptop: {
            x: -1,
            y: -5,
            w: 27,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 40,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 40,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 45,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.32,
      laptop: 0.32,
      tablet: 0.32,
      phablet: 0.45,
      mobile: 0.7,
    },

    items: [
      /* 3. */ {
        type: 'copy',
        copy: 'Let’s take a look at donating with credit card first!',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 200,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 200,
          },
        },
      },
      {
        type: 'image',
        image: '03.png',
        imageDark: '03-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: -1,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 90,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 80,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.32,
      laptop: 0.34,
      tablet: 0.32,
      phablet: 0.45,
      mobile: 0.95,
    },

    items: [
      /* 4. */ {
        type: 'copy',
        copy: 'Select your donation amount. 100% goes to the grant but expect payment provider fees on top (we don’t charge any).',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 10,
            y: 0,
            w: 350,
          },
          phablet: {
            x: 0,
            y: 0,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '04.png',
        imageDark: '04-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: -1,
            w: 90,
          },
          laptop: {
            x: 5,
            y: -1,
            w: 85,
          },
          tablet: {
            x: -10,
            y: -1,
            w: 70,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 90,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 4,
      laptop: 4,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.32,
      laptop: 0.34,
      tablet: 0.34,
      phablet: 0.45,
      mobile: 1,
    },

    items: [
      /* 5. */ {
        type: 'copy',
        copy: 'Sign in (the process is exactly the same whether you’ve already donated or not.) There’s no password to set up and remember (phew!).',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 350,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '05.png',
        imageDark: '05-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: -1,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 90,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 80,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 5,
      laptop: 5,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.45,
      laptop: 0.38,
      tablet: 0.34,
      phablet: 0.45,
      mobile: 1,
    },

    items: [
      /* 6. */ {
        type: 'copy',
        copy: 'You’ll get a confirmation email or text with a magic link (super secure!). Click on it.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 450,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 350,
          },
          phablet: {
            x: 0,
            y: 0,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '06.png',
        imageDark: '06-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 27,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: 10,
            y: -1,
            w: 80,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 7,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.45,
      laptop: 0.35,
      tablet: 0.45,
      phablet: 0.6,
      mobile: 1,
    },

    items: [
      /* 7. */ {
        type: 'copy',
        copy: 'We’ll automatically create your Artizen wallet for you. So you don’t have to get an external one. (But you can connect another wallet if you have one.)',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 500,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 450,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 450,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '07.png',
        imageDark: '07-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: -1,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 80,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 75,
          },
          phablet: {
            x: 0,
            y: 0,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 5,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.38,
      tablet: 0.4,
      phablet: 0.45,
      mobile: 1,
    },

    items: [
      /* 8. */ {
        type: 'copy',
        copy: 'We’ll convert your donation amount to USDC and transfer it to your wallet.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 400,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 400,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 400,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: 'This is where things might get a little unexpected. The transaction’s not instant. It might take anywhere from 10 minutes up to 2 hours.',
        coordinates: {
          desktop: {
            x: 40,
            y: 60,
            w: 350,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 300,
          },
          tablet: {
            x: -5,
            y: -1,
            w: 300,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '08.png',
        imageDark: '08-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 15,
            w: 100,
          },
          laptop: {
            x: 0,
            y: 20,
          },
          tablet: {
            x: 10,
            y: -1,
            w: 80,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.38,
      tablet: 0.4,
      phablet: 0.55,
      mobile: 1,
    },

    items: [
      /* 9. */ {
        type: 'copy',
        copy: 'THIS IS FINE.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 250,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: 'No, really, it’s fine. It’s how crypto works.',
        coordinates: {
          desktop: {
            x: -1,
            y: -1,
            w: 460,
          },
          laptop: {
            x: -1,
            y: 0,
            w: 335,
          },
          tablet: {
            x: -1,
            y: 0,
            w: 335,
          },
          phablet: {
            x: -1,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '09.png',
        imageDark: '09-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 15,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: 10,
            y: -1,
            w: 70,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 5,
      tablet: 5,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.58,
      mobile: 1,
    },

    items: [
      /* 10. */ {
        type: 'copy',
        copy: 'You can close the browser window – we’ll send you an email when the donation’s ready to transfer to the Fund.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 500,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 400,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 330,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '10.png',
        imageDark: '10-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 15,
            w: 100,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 90,
          },
          tablet: {
            x: 0,
            y: -1,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 80,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 6,
      tablet: 7,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.56,
      mobile: 1,
    },

    items: [
      /* 11. */ {
        type: 'copy',
        copy: 'Already starting with crypto? You can donate using USDC on Polygon or Ethereum.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 500,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 320,
          },
          tablet: {
            x: 10,
            y: 0,
            w: 300,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '11.png',
        imageDark: '11-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 15,
            w: 100,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 90,
          },
          tablet: {
            x: 15,
            y: -1,
            w: 80,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 90,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 7,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.62,
      mobile: 1,
    },

    items: [
      /* 12. */ {
        type: 'copy',
        copy: 'In that case, sign in and connect your existing wallet to move your coins to your new Artizen wallet.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 500,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 350,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 350,
          },
          phablet: {
            x: -1,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: '(Psst! You can save your wallet connection to not have to go through the process next time.)',
        coordinates: {
          desktop: {
            x: -1,
            y: 20,
            w: 400,
          },
          laptop: {
            x: -1,
            y: 10,
            w: 300,
          },
          tablet: {
            x: 0,
            y: 30,
            w: 300,
          },
          phablet: {
            x: -15,
            y: 20,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '12.png',
        imageDark: '12-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: -1,
            w: 80,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 80,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 60,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 5,
      laptop: 5,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.61,
      mobile: 1,
    },

    items: [
      /* 13. */ {
        type: 'copy',
        copy: 'Then carefully follow the instructions from your wallet provider.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 250,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '13.png',
        imageDark: '13-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 20,
            w: 100,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: 0,
            y: -1,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.475,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.6,
      mobile: 1,
    },

    items: [
      /* 14. */ {
        type: 'copy',
        copy: 'After that, a bit of crypto magic like swapping and bridging will happen in the background so that your donation can safely make its way to the Artizen Fund.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 450,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 450,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 400,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 400,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: 'Don’t forget that this might take some time.',
        coordinates: {
          desktop: {
            x: 60,
            y: 25,
            w: 250,
          },
          laptop: {
            x: -1,
            y: 30,
            w: 200,
          },
          tablet: {
            x: -1,
            y: 30,
            w: 180,
          },
          phablet: {
            x: 0,
            y: 20,
            w: 200,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '14.png',
        imageDark: '14-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 25,
            w: 100,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 80,
          },
          tablet: {
            x: 0,
            y: -1,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 75,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.475,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.6,
      mobile: 1,
    },

    items: [
      /* 15. */ {
        type: 'copy',
        copy: 'Ta-da! The donation’s on its way to the Artizen Fund. A receipt will land in your email inbox',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 450,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: '(This may take another few hours, though. You know the drill by now!)',
        coordinates: {
          desktop: {
            x: 50,
            y: 75,
            w: 300,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 250,
          },
          tablet: {
            x: -10,
            y: -1,
            w: 250,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 270,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '15.png',
        imageDark: '15-dark.png',
        coordinates: {
          desktop: {
            x: 10,
            y: 20,
            w: 80,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 70,
          },
          tablet: {
            x: 0,
            y: 10,
            w: 70,
          },
          phablet: {
            x: 5,
            y: -1,
            w: 70,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 5,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.38,
      laptop: 0.36,
      tablet: 0.4,
      phablet: 0.55,
      mobile: 1,
    },

    items: [
      /* 16. */ {
        type: 'copy',
        copy: 'And your name will land on the leaderboard. While you can enjoy all the perks that come along with it.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 500,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 400,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '16.png',
        imageDark: '16-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 12,
            w: 100,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: 0,
            y: -1,
          },
          phablet: {
            x: 10,
            y: -1,
            w: 80,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.38,
      laptop: 0.36,
      tablet: 0.45,
      phablet: 0.53,
      mobile: 1,
    },

    items: [
      /* 17. */ {
        type: 'copy',
        copy: 'And the satisfaction of supporting a cause that matters.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 350,
          },
          laptop: {
            x: 0,
            y: 0,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 200,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'copy',
        copy: 'And of making the world a slightly better place.',
        coordinates: {
          desktop: {
            x: -1,
            y: -1,
            w: 300,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 300,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: -1,
            y: -5,
            w: 150,
          },
          mobile: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        type: 'image',
        image: '17.png',
        imageDark: '17-dark.png',
        coordinates: {
          desktop: {
            x: 0,
            y: 7,
            w: 100,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 81,
          },
          tablet: {
            x: 10,
            y: 0,
            w: 80,
          },
          phablet: {
            x: 0,
            y: -1,
            w: 80,
          },
          mobile: {
            x: 0,
            y: -1,
          },
        },
      },
    ],
  },
]

export default guideMap
