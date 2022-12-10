const alternatingPanels: Array<IAlternatingPanel> = [
  {
    image: '/assets/illustrations/home/about.png',
    imageDark: '/assets/illustrations/home/about-dark.png',
    title: 'Earn Artifacts from Winners',
    copy: 'Artifacts are unique works of art that capture the spark of inspiration behind a project. Every day, a new series of three Artifacts is minted by our grant winner and awarded to:',
    list: [
      {
        label: 'The Top Donor',
        glyph: 'trend',
      },
      {
        label: 'The Project Creator',
        glyph: 'palette',
      },
      {
        label: 'Our Community Treasury',
        glyph: 'artToken',
      },
    ],
    buttonLabel: 'Learn More',
    destination: '/about',
  },
  {
    image: '/assets/illustrations/home/trust.png',
    imageDark: '/assets/illustrations/home/trust-dark.png',
    title: 'Curate Our Grants',
    copy: 'Artifacts give you the power to curate our grants. Every day, a new grant winner is selected by our community of Artifact holders. Join us to vote for your favorite projects and champion the creators you love.',
    list: [
      {
        label: 'Review Submissions',
        glyph: 'eye',
      },
      {
        label: 'Vote for Projects You Love',
        glyph: 'tick',
      },
      {
        label: 'New Winner Selected Every Day',
        glyph: 'crown',
      },
    ],
    buttonLabel: 'Learn More',
    destination: '/about',
  },
  {
    image: '/assets/illustrations/home/about.png',
    imageDark: '/assets/illustrations/home/about-dark.png',
    title: 'Join Our Movement',
    copy: 'Artizen is built by our community of Artifact holders. Together we’re on a mission to unlock human creativity and reinvent how the world funds art, science, and public goods of every kind.',
    list: [
      {
        label: 'Support Creators',
        glyph: 'donate',
      },
      {
        label: 'Reinvent Grant Funding',
        glyph: 'intersect',
      },
      {
        label: 'Unlock Human Creativity',
        glyph: 'globe',
      },
    ],
    buttonLabel: 'Learn More',
    destination: '/about',
  },
]

export { alternatingPanels }
