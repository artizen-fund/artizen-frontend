import { IAlternatingPanel } from '../../components/Layout/AlternatingPanel'

const alternatingPanels: Array<IAlternatingPanel> = [
  {
    image: '/assets/illustrations/home/about.png',
    imageDark: '/assets/illustrations/home/about-dark.png',
    title: 'About the Artizen Fund',
    copy: 'We’re on a mission to unlock human creativity. By empowering our community to crowdfund new grants, curate the awards, and earn NFTs and rewards, the Artizen Fund radically expands support for creators of every kind.',
    buttonLabel: 'Read more about our mission',
    destination: '/about',
  },
  {
    image: '/assets/illustrations/home/how-it-works.png',
    imageDark: '/assets/illustrations/home/how-it-works-dark.png',
    title: 'How it works',
    copy: 'The leaderboard lists all the donors to our current grant cycle. Your position depends on the amount you’ve contributed. The more you donate, the higher you’ll rank. All donors earn $ART tokens, but only the top donor is guaranteed to win this month’s NFT Artifact.',
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
    copy: 'When you donate, you earn $ART tokens giving you an ownership stake in the Artizen Fund as well as the chance to collect NFT Artifacts from our grant winners.',
    buttonLabel: 'Here’s how that works',
    destination: '/about',
  },
]

export { alternatingPanels }
