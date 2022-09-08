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

export type GuideCell = {
  columns: Record<ResponsiveSize, number>
  height: Record<ResponsiveSize, number>
  items: Array<GuideCopy | GuideImage>
}

const guideMap: Array<GuideCell> = [
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
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 1. */ {
        type: 'copy',
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
        type: 'image',
        image: 'guide-01.svg',
        imageDark: 'guide-01-dark.svg',
        altText: 'fellow strutting with card and coin',
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
      desktop: 12,
      laptop: 12,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.25,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 2. */ {
        type: 'copy',
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
        type: 'copy',
        copy: 'Your credit card (We’ll take care of turning your money to crypto, no worries) and Crypto (Polygon or Ethereum).',
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
        type: 'image',
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
        type: 'image',
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
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 3. */ {
        type: 'copy',
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
        type: 'image',
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
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 4. */ {
        type: 'copy',
        copy: 'Select your donation amount. 100% goes to the grant but expect payment provider fees on top (we don’t charge any).',
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
        type: 'image',
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
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 5. */ {
        type: 'copy',
        copy: 'Sign in (the process is exactly the same whether you’ve already donated or not.) There’s no password to set up and remember (phew!).',
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
        type: 'image',
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
      desktop: 5,
      laptop: 5,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 6. */ {
        type: 'copy',
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
        type: 'image',
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
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 7. */ {
        type: 'copy',
        copy: 'We’ll automatically create your Artizen wallet for you. So you don’t have to get an external one. (But you can connect another wallet if you have one.)',
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
        type: 'image',
        image: 'guide-07.svg',
        imageDark: 'guide-07-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 8. */ {
        type: 'copy',
        copy: 'We’ll convert your donation amount to USDC and transfer it to your wallet.',
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
        type: 'copy',
        copy: 'This is where things might get a little unexpected. The transaction’s not instant. It might take anywhere from 10 minutes up to 2 hours.',
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
        type: 'image',
        image: 'guide-08.svg',
        imageDark: 'guide-08-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 9. */ {
        type: 'copy',
        copy: 'THIS IS FINE.',
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
        type: 'copy',
        copy: 'No, really, it’s fine. It’s how crypto works.',
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
        type: 'image',
        image: 'guide-09.svg',
        imageDark: 'guide-09-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 10. */ {
        type: 'copy',
        copy: 'You can close the browser window – we’ll send you an email when the donation’s ready to transfer to the Fund.',
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
        type: 'image',
        image: 'guide-10.svg',
        imageDark: 'guide-10-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 11. */ {
        type: 'copy',
        copy: 'Already starting with crypto? You can donate using USDC on Polygon or Ethereum.',
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
        type: 'image',
        image: 'guide-11.svg',
        imageDark: 'guide-11-dark.svg',
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
      desktop: 7,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 12. */ {
        type: 'copy',
        copy: 'In that case, sign in and connect your existing wallet to move your coins to your new Artizen wallet.',
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
        type: 'copy',
        copy: '(Psst! You can save your wallet connection to not have to go through the process next time.)',
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
        type: 'image',
        image: 'guide-12.svg',
        imageDark: 'guide-12-dark.svg',
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
      desktop: 5,
      laptop: 5,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.368,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 13. */ {
        type: 'copy',
        copy: 'Then carefully follow the instructions from your wallet provider.',
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
        type: 'image',
        image: 'guide-13.svg',
        imageDark: 'guide-13-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.475,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 14. */ {
        type: 'copy',
        copy: 'After that, a bit of crypto magic like swapping and bridging will happen in the background so that your donation can safely make its way to the Artizen Fund.',
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
        type: 'copy',
        copy: 'Don’t forget that this might take some time.',
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
        type: 'image',
        image: 'guide-14.svg',
        imageDark: 'guide-14-dark.svg',
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
      desktop: 6,
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.475,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 15. */ {
        type: 'copy',
        copy: 'Ta-da! The donation’s on its way to the Artizen Fund. A receipt will land in your email inbox',
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
        type: 'copy',
        copy: '(This may take another few hours, though. You know the drill by now!)',
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
        type: 'image',
        image: 'guide-15.svg',
        imageDark: 'guide-15-dark.svg',
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
      desktop: 5,
      laptop: 5,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.493,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 16. */ {
        type: 'copy',
        copy: 'And your name will land on the leaderboard. While you can enjoy all the perks that come along with it.',
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
        type: 'image',
        image: 'guide-16.svg',
        imageDark: 'guide-16-dark.svg',
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
      desktop: 7,
      laptop: 7,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 0.493,
      laptop: 1,
      tablet: 1,
      phablet: 1,
      mobile: 1,
    },

    items: [
      /* 17. */ {
        type: 'copy',
        copy: 'And the satisfaction of supporting a cause that matters.',
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
        type: 'copy',
        copy: 'And of making the world a slightly better place.',
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
        type: 'image',
        image: 'guide-17.svg',
        imageDark: 'guide-17-dark.svg',
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
