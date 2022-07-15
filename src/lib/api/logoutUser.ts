// todo: this is probably busted

const logoutUser = async (): Promise<boolean> =>
  await fetch('/api/logout', {
    method: 'POST',
  }).then(data => data.status === 200)

export default logoutUser
