import { Dispatch } from '../session/actions'

const loginUser = async (email: string, dispatch: Dispatch, magic: MagicLinkInstance) => {
  const token = await magic.auth.loginWithMagicLink({ email, showUI: false })

  return await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async data => {
      const user = await data.json()
      if (!user.id) {
        throw new Error('error unwrapping JSON')
      }
      dispatch({ type: 'SET_USER', payload: { user } })
    })
    .catch(e => {
      throw new Error(e)
    })
}

export default loginUser
