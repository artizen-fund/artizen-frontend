import { Dispatch, SessionAction } from './actions'
import { loginUser, fetchUser, logoutUser } from '@lib'

/* useReducer isn't crazy about async actions.
 * This middleware intercepts our async actions, which will initiate their own dispatches upon completion.
 * Normal actions get passed directly to the reducer normally.
 *
 * source: https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
 */

export const dispatchMiddleware = (dispatch: Dispatch) => (action: SessionAction) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      loginUser(action.payload.email, dispatch)
      break
    case 'END_SESSION':
      logoutUser(dispatch)
      break
    case 'CHECK_SESSION':
      fetchUser(dispatch)
      break
    default:
      return dispatch(action)
  }
}
