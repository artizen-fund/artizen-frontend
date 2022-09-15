import Leaderboard, { ILeaderboard } from './'

const story = {
  title: 'page/home/Leaderboard',
  component: Leaderboard,
  argTypes: {},
}
export default story

export const LeaderboardComponent = (props: ILeaderboard) => {
  const leaderboard = [
    { name: 'herp derp', amount: 69 },
    { name: 'dorp donk', amount: 68 },
    { name: 'hoop doop', amount: 67 },
  ]
  return <Leaderboard {...{ leaderboard }} {...props} />
}
