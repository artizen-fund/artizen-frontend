import { ResponsiveSize } from '@theme'

export type DonationGuideCoordinate = Record<ResponsiveSize, { x: number; y: number; w?: number; h?: number }>

type GuideCopy = {
  type: 'copy'
  copy: string
  coordinates: DonationGuideCoordinate
}

type GuideImage = {
  type: 'image'
  image: string
  imageDark?: string
  altText?: string
  coordinates: DonationGuideCoordinate
}

type GuideAnimation = {
  type: 'animation'
  lottieJson: string
  lottieJsonDark?: string
  altText?: string
  coordinates: DonationGuideCoordinate
}

export type IDonationGuideCell = {
  columns: Record<ResponsiveSize, number>
  height: Record<ResponsiveSize, number>
  items: Array<GuideCopy | GuideImage | GuideAnimation>
}

export const donationGuideMap: Array<IDonationGuideCell> = [
  {
    columns: {
      desktop: 12,
      laptop: 12,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    /* note: phablet and mobile height are a multiplier of screen width (0.7 = 70% of screen width)
       tablet, laptop and desktop are absolute numbers (100 = 100px) */
    height: {
      desktop: 750,
      laptop: 530,
      tablet: 470,
      phablet: 0.85,
      mobile: 1.45,
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
            w: 300,
          },
          tablet: {
            x: 0,
            y: 30,
            w: 200,
          },
          phablet: {
            x: 0,
            y: 18,
            w: 240,
          },
          mobile: {
            x: 0,
            y: 32,
            w: 160,
          },
        },
      },
      {
        type: 'image',
        image: '01a.png',
        imageDark: '01a-dark.png',
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
            w: 60,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 73,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 80,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 100,
          },
        },
      },
      {
        type: 'image',
        image: '01b.png',
        imageDark: '01b-dark.png',
        altText: 'two blobbies and a splat',
        coordinates: {
          desktop: {
            x: 15,
            y: -1,
            w: 55,
          },
          laptop: {
            x: 9,
            y: -7,
            w: 30,
          },
          tablet: {
            x: 0,
            y: -1,
            w: 30,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 80,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 100,
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
      desktop: 360,
      laptop: 230,
      tablet: 300,
      phablet: 0.72,
      mobile: 1.2,
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
            w: 300,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 270,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 240,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 220,
          },
        },
      },
      {
        type: 'copy',
        copy: 'Your credit card (We’ll take care of turning your money to crypto, no worries) and Crypto (Polygon or Ethereum).',
        coordinates: {
          desktop: {
            x: 0,
            y: 40,
            w: 360,
          },
          laptop: {
            x: 0,
            y: -3,
            w: 230,
          },
          tablet: {
            x: -2,
            y: 4,
            w: 310,
          },
          phablet: {
            x: -1,
            y: 26,
            w: 280,
          },
          mobile: {
            x: -1,
            y: 23,
            w: 220,
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
            y: 0,
            w: 33,
          },
          laptop: {
            x: 36,
            y: -5,
            w: 33,
          },
          tablet: {
            x: 8,
            y: -1,
            w: 46,
          },
          phablet: {
            x: 0,
            y: -5,
            w: 53,
          },
          mobile: {
            x: 0,
            y: -19,
            w: 60,
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
            w: 27,
          },
          laptop: {
            x: -1,
            y: -5,
            w: 27,
          },
          tablet: {
            x: -8,
            y: -2,
            w: 36,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 43,
          },
          mobile: {
            x: -1,
            y: 70,
            w: 50,
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
      desktop: 500,
      laptop: 340,
      tablet: 300,
      phablet: 0.65,
      mobile: 0.8,
    },

    items: [
      /* 3. */ {
        type: 'copy',
        copy: 'Let’s take a look at donating with credit card first!',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 380,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 200,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 200,
          },
          phablet: {
            x: 0,
            y: 0,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 130,
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
            w: 110,
          },
          tablet: {
            x: 10,
            y: -1,
            w: 100,
          },
          phablet: {
            x: 0,
            y: -1,
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
      desktop: 4,
      laptop: 4,
      tablet: 6,
      phablet: 2,
      mobile: 4,
    },

    height: {
      desktop: 500,
      laptop: 350,
      tablet: 315,
      phablet: 0.65,
      mobile: 1,
    },

    items: [
      /* 4. */ {
        type: 'copy',
        copy: 'Select your donation amount. 100% goes to the grant but expect payment provider fees on top (we don’t charge any).',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 488,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 280,
          },
          tablet: {
            x: 10,
            y: 0,
            w: 270,
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
            w: 95,
          },
          tablet: {
            x: -10,
            y: -1,
            w: 86,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 90,
          },
          mobile: {
            x: 0,
            y: -1,
            w: 93,
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
      desktop: 500,
      laptop: 350,
      tablet: 320,
      phablet: 0.65,
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
            w: 320,
          },
          tablet: {
            x: 0,
            y: 0,
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
            w: 100,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 93,
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
      desktop: 500,
      laptop: 390,
      tablet: 320,
      phablet: 0.65,
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
            w: 300,
          },
          tablet: {
            x: 0,
            y: 0,
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
            w: 90,
          },
          laptop: {
            x: 10,
            y: -1,
            w: 97,
          },
          tablet: {
            x: 10,
            y: -1,
            w: 92,
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
      desktop: 610,
      laptop: 395,
      tablet: 335,
      phablet: 0.75,
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
            w: 330,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 270,
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
            x: -1,
            y: -1,
            w: 90,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 85,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 70,
          },
          phablet: {
            x: 0,
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
      desktop: 6,
      laptop: 6,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 570,
      laptop: 380,
      tablet: 260,
      phablet: 0.75,
      mobile: 1.08,
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
            w: 280,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 240,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 300,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 190,
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
            w: 220,
          },
          tablet: {
            x: -2,
            y: -1,
            w: 260,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 200,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 150,
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
            y: 13,
            w: 100,
          },
          laptop: {
            x: 0,
            y: 20,
            w: 105,
          },
          tablet: {
            x: 15,
            y: -5,
            w: 70,
          },
          phablet: {
            x: 0,
            y: -18,
          },
          mobile: {
            x: 0,
            y: -35,
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
      desktop: 500,
      laptop: 380,
      tablet: 350,
      phablet: 0.65,
      mobile: 0.85,
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
            y: 0,
            w: 510,
          },
          laptop: {
            x: 33,
            y: 0,
            w: 180,
          },
          tablet: {
            x: -22,
            y: 0,
            w: 335,
          },
          phablet: {
            x: -1,
            y: 0,
            w: 180,
          },
          mobile: {
            x: -1,
            y: 5,
            w: 160,
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
            w: 75,
          },
          phablet: {
            x: 0,
            y: -1,
          },
          mobile: {
            x: 0,
            y: -1,
            w: 110,
          },
        },
      },
    ],
  },

  {
    columns: {
      desktop: 6,
      laptop: 6,
      tablet: 5,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 600,
      laptop: 390,
      tablet: 360,
      phablet: 0.75,
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
            w: 360,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 270,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 220,
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
            w: 80,
          },
          laptop: {
            x: 10,
            y: -1,
            w: 80,
          },
          tablet: {
            x: 0,
            y: -1,
            w: 120,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 80,
          },
          mobile: {
            x: 0,
            y: -1,
            w: 95,
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
      desktop: 500,
      laptop: 390,
      tablet: 360,
      phablet: 0.7,
      mobile: 0.9,
    },

    items: [
      /* 11. */ {
        type: 'copy',
        copy: 'Already starting with crypto? You can donate using USDC on Polygon or Ethereum.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 420,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 300,
          },
          tablet: {
            x: 10,
            y: 0,
            w: 300,
          },
          phablet: {
            x: 0,
            y: 0,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 220,
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
            x: 2,
            y: -1,
            w: 93,
          },
          tablet: {
            x: 8,
            y: -1,
            w: 96,
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
      laptop: 6,
      tablet: 12,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 600,
      laptop: 440,
      tablet: 300,
      phablet: 0.89,
      mobile: 1.08,
    },

    items: [
      /* 12. */ {
        type: 'copy',
        copy: 'In that case, sign in and connect your existing wallet to move your coins to your new Artizen wallet.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 600,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 350,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 300,
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
            x: 0,
            y: 20,
            w: 370,
          },
          laptop: {
            x: 0,
            y: 22,
            w: 200,
          },
          tablet: {
            x: 0,
            y: 29,
            w: 190,
          },
          phablet: {
            x: 0,
            y: 22,
            w: 200,
          },
          mobile: {
            x: 6,
            y: 24,
            w: 180,
          },
        },
      },
      {
        type: 'image',
        image: '12.png',
        imageDark: '12-dark.png',
        coordinates: {
          desktop: {
            x: 10,
            y: -1,
            w: 80,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 100,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 64,
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
      laptop: 6,
      tablet: 6,
      phablet: 4,
      mobile: 4,
    },

    height: {
      desktop: 600,
      laptop: 440,
      tablet: 350,
      phablet: 0.75,
      mobile: 0.85,
    },

    items: [
      /* 13. */ {
        type: 'copy',
        copy: 'Then carefully follow the instructions from your wallet provider.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 350,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 250,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 200,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 170,
          },
        },
      },
      {
        type: 'image',
        image: '13.png',
        imageDark: '13-dark.png',
        coordinates: {
          desktop: {
            x: -1,
            y: -1,
            w: 110,
          },
          laptop: {
            x: 0,
            y: -1,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 107,
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
      desktop: 560,
      laptop: 400,
      tablet: 350,
      phablet: 0.76,
      mobile: 1.06,
    },

    items: [
      /* 14. */ {
        type: 'copy',
        copy: 'After that, a bit of crypto magic like swapping and bridging will happen in the background so that your donation can safely make its way to the Artizen Fund.',
        coordinates: {
          desktop: {
            x: 0,
            y: 0,
            w: 650,
          },
          laptop: {
            x: 0,
            y: 0,
            w: 350,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 320,
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
        type: 'copy',
        copy: 'Don’t forget that this might take some time.',
        coordinates: {
          desktop: {
            x: -5,
            y: 26,
            w: 220,
          },
          laptop: {
            x: -1,
            y: 30,
            w: 190,
          },
          tablet: {
            x: 61,
            y: 30,
            w: 130,
          },
          phablet: {
            x: 0,
            y: 25,
            w: 130,
          },
          mobile: {
            x: -1,
            y: 30,
            w: 120,
          },
        },
      },
      {
        type: 'image',
        image: '14.png',
        imageDark: '14-dark.png',
        coordinates: {
          desktop: {
            x: 5,
            y: 25,
            w: 80,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 80,
          },
          tablet: {
            x: 0,
            y: -1,
            w: 103,
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
      desktop: 560,
      laptop: 400,
      tablet: 370,
      phablet: 0.78,
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
            w: 380,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 280,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 250,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 220,
          },
        },
      },
      {
        type: 'copy',
        copy: '(This may take another few hours, though. You know the drill by now!)',
        coordinates: {
          desktop: {
            x: 50,
            y: -1,
            w: 300,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 250,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 160,
          },
          phablet: {
            x: -1,
            y: -1,
            w: 180,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 150,
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
            y: -1,
            w: 64,
          },
          laptop: {
            x: 0,
            y: -3,
            w: 70,
          },
          tablet: {
            x: 0,
            y: -11,
            w: 85,
          },
          phablet: {
            x: 5,
            y: -8,
            w: 66,
          },
          mobile: {
            x: 0,
            y: -8,
            w: 83,
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
      desktop: 620,
      laptop: 440,
      tablet: 375,
      phablet: 0.76,
      mobile: 1.0,
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
            w: 320,
          },
          tablet: {
            x: 0,
            y: 0,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 350,
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
            x: 5,
            y: -1,
            w: 83,
          },
          laptop: {
            x: 0,
            y: -1,
            w: 90,
          },
          tablet: {
            x: 5,
            y: -1,
            w: 90,
          },
          phablet: {
            x: 10,
            y: -1,
            w: 70,
          },
          mobile: {
            x: 0,
            y: -1,
            w: 90,
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
      desktop: 620,
      laptop: 440,
      tablet: 350,
      phablet: 0.8,
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
            w: 310,
          },
          tablet: {
            x: 0,
            y: 0,
            w: 280,
          },
          phablet: {
            x: 0,
            y: 0,
            w: 200,
          },
          mobile: {
            x: 0,
            y: 0,
            w: 170,
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
            w: 240,
          },
          laptop: {
            x: -1,
            y: -1,
            w: 200,
          },
          tablet: {
            x: -1,
            y: -1,
            w: 145,
          },
          phablet: {
            x: -1,
            y: -5,
            w: 150,
          },
          mobile: {
            x: -1,
            y: -1,
            w: 140,
          },
        },
      },
      {
        type: 'image',
        image: '17.png',
        imageDark: '17-dark.png',
        coordinates: {
          desktop: {
            x: 10,
            y: -6,
            w: 75,
          },
          laptop: {
            x: 6,
            y: -9,
            w: 81,
          },
          tablet: {
            x: 18,
            y: -1,
            w: 70,
          },
          phablet: {
            x: 8,
            y: -17,
            w: 85,
          },
          mobile: {
            x: 0,
            y: -15,
          },
        },
      },
    ],
  },
]
