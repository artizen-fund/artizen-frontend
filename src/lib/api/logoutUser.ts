import { Dispatch } from '../session/actions'

const logoutUser = async (dispatch: Dispatch) =>
  await fetch('/api/logout', {
    method: 'POST',
  }).then(data => {
    if (data.status === 200) {
      dispatch({ type: 'SET_USER', payload: { user: undefined } })
    }
  })

export default logoutUser
