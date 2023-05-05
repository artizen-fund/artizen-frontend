import { GlyphKey } from '@theme'

const alternatingPanels: Array<IAlternatingPanel> = [
  {
    image: '/assets/illustrations/home/artifacts.png',
    imageDark: '/assets/illustrations/home/artifacts-dark.png',
    title: 'Invest in positive impact',
    copy: 'Each Artifact is an open edition NFT designed to capture the essence of a project and its impact on the world. Think carbon credits, but for human creativity. Artifacts document how a project plans to:',
    list: [
      {
        label: 'Transform Lives',
        glyph: 'heart',
      },
      {
        label: 'Revitalize Communities',
        glyph: 'communities',
      },
      {
        label: 'Regenerate Ecosystems',
        glyph: 'globe',
      },
    ],
    buttonLabel: 'Learn More',
    destination: 'https://help.artizen.fund/en/articles/6746680-artifacts-reward-positive-impact',
  },
  {
    image: '/assets/illustrations/home/leaderboard.png',
    imageDark: '/assets/illustrations/home/leaderboard-dark.png',
    title: 'Fund projects you love',
    copy: 'Buy Artifacts to help raise money for projects you love. Every Artifact you buy unlocks match funding. And cash prizes are awarded to the projects with the most Artifacts sold.  ',
    list: [
      {
        label: 'Raise Money for New Projects',
        glyph: 'eye',
      },
      {
        label: 'Unlock Match Funding',
        glyph: 'tick',
      },
      {
        label: 'Award Cash Prizes',
        glyph: 'crown',
      },
    ],
    buttonLabel: 'Learn More',
    destination: 'https://help.artizen.fund/en/articles/7730702-match-funding-for-artifact-sales',
  },
  {
    image: '/assets/illustrations/home/about.png',
    imageDark: '/assets/illustrations/home/about-dark.png',
    title: 'Join a Vibrant Community',
    copy: 'When you buy an Artifact, you join a vibrant community of artists, scientists, coders, and creators of every kind.  Together we curate our Official Selection, collaborate on projects, and elevate each other.',
    list: [
      {
        label: 'Connect at Private Gatherings',
        glyph: 'lock',
      },
      {
        label: 'Curate our Official Selection',
        glyph: 'speechBubble',
      },
      {
        label: 'Elevate Each Other',
        glyph: 'ladder',
      },
    ],
    buttonLabel: 'Learn More',
    destination: 'https://help.artizen.fund/en/articles/6761187-join-a-vibrant-community',
  },
]

export { alternatingPanels }
