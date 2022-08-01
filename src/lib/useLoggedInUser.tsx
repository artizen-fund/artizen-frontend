interface IUser2 {
  name?: string
}

export const useLoggedInUser = (): [IUser2, undefined | boolean] => {
  const user: IUser2 | undefined = undefined
  const loading = false

  const user2 = user !== undefined ? user : {}

  return [user2, loading]
}
