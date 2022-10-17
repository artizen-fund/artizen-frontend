import { IAlternatingPanel } from '../../components/Layout/AlternatingPanel'

const alternatingPanels: Array<IAlternatingPanel> = [
  {
    image: '/assets/illustrations/home/about.png',
    imageDark: '/assets/illustrations/home/about-dark.png',
    title: 'About the Artizen Fund',
    copy: 'Artizen is a community fund for human creativity. We’re combining crowdfunding, community curation, and NFT rewards to let everyone directly support the projects they care about – with a level of transparency only web3 can offer.',
    buttonLabel: 'Read more about our mission',
    destination: '/about',
  },
  {
    image: '/assets/illustrations/home/how-it-works.png',
    imageDark: '/assets/illustrations/home/how-it-works-dark.png',
    title: 'How it works',
    copy: 'Each month, people donate to grants, and our community selects and awards the winning projects. Anyone can submit a project proposal, and all finalists get funding according to their share of the vote, while donors can collect NFTs minted by grant winners.',
    buttonLabel: 'Here’s the whole story',
    destination: '/about',
  },
  {
    image: '/assets/illustrations/home/trust.png',
    imageDark: '/assets/illustrations/home/trust-dark.png',
    title: 'What we’re looking for',
    copy: 'You can submit a creative project at any stage of development, from rough idea to released work, and in any medium, from oil paintings to open source code. All we ask is that it’s original, feasible, and makes an impact. Sound like you?',
    buttonLabel: 'Apply for funding',
    destination: 'https://artizen.link/apply',
  },
  {
    image: '/assets/illustrations/home/leaderboard.png',
    imageDark: '/assets/illustrations/home/leaderboard-dark.png',
    title: 'Donate and become an owner',
    copy: 'When you donate, you earn an ownership stake in the Artizen Fund as well as NFT Artifacts from the winning projects. ',
    buttonLabel: 'Here’s how that works',
    destination: '/about',
  },
]

export { alternatingPanels }
