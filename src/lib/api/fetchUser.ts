import { Dispatch } from '../session/actions'

const fetchUser = async (dispatch: Dispatch) =>
  await fetch('/api/user')
    .then(async data => {
      const user = await data.json()
      if (!user.id) {
        throw new Error('Error unwrapping json')
      }
      dispatch({ type: 'SET_USER', payload: { user } })
    })
    .catch(e => {
      throw new Error(e)
    })

export default fetchUser
