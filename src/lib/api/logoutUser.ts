// todo: this is incomplete, it doesn't affect Apollo local store

const logoutUser = async (): Promise<boolean> =>
  await fetch('/api/logout', {
    method: 'POST',
  }).then(data => data.status === 200)

export default logoutUser
