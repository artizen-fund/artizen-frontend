export const mockGrants = [
  {
    startTime: '1669982845',
    season: '1',
    project: {
      title: '',
      longline: '',
      description: '',
      impact: '',
      tags: ['Art', 'Science', 'Technology', 'Design', 'Human Creativity'],
      creationDate: '1634515200',
      completionDate: '1666828800',
      lead: {
        firstName: 'Lead Name 1',
        lastName: 'Lead Last Name 1',
        externalLink: 'https://test.com/lead1',
      },
      members: [
        {
          firstName: 'Test Name 1',
          lastName: 'Test Last Name 1',
          externalLink: 'https://test.com/name1',
        },
        {
          firstName: 'Test Name 2',
          lastName: 'Test Last Name 2',
          externalLink: 'https://test.com/name2',
        },
      ],
    },
    artifacts: [
      {
        imageUri: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        videoUri: 'https://res.cloudinary.com/demo/video/upload/docs/walking_talking.webm',
        name: 'Flower',
        description: 'Some Flowers',
        edition: 'Patron Edition',
      },
      {
        imageUri: 'https://res.cloudinary.com/demo/image/upload/lady.jpg',
        videoUri: 'https://demo-res.cloudinary.com/video/upload/ski_jump.webm',
        name: 'Lady',
        description: 'A Lady',
        edition: 'Community Edition',
      },
      {
        imageUri: 'https://res.cloudinary.com/demo/image/upload/actor.png',
        videoUri: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
        name: 'Actor',
        description: 'An Actor',
        edition: 'Test Edition',
      },
    ],
  },
]
