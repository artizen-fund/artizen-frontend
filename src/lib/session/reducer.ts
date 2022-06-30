import { SessionState, checkoutMethods } from './state'
import { Dispatch, SessionAction } from './actions'
import { loginUser, fetchUser, logoutUser } from '@lib'

/* useReducer isn't crazy about async actions.
 * This middleware intercepts our async actions, which will initiate their own dispatches upon completion.
 * Normal actions get passed directly to the reducer normally.
 *
 * It's not as ugly as it looks. Async actions are in the middleware, everything else in the reducer.
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

export const reducer = (state: SessionState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case 'SET_AMOUNT': {
      const minAmountForMethod = checkoutMethods[state.method].minimum
      return {
        ...state,
        amount: action.payload.amount < minAmountForMethod ? minAmountForMethod : action.payload.amount,
      }
    }
    case 'SET_CHECKOUT_METHOD': {
      const minAmountForMethod = checkoutMethods[action.payload.method].minimum
      return {
        ...state,
        method: action.payload.method,
        amount: state.amount < minAmountForMethod ? minAmountForMethod : state.amount,
      }
    }
    case 'SET_CHECKOUT_STAGE': {
      return { ...state, stage: action.payload.stage }
    }

    default: {
      // note: thanks to typescript rules, this should be un-reachable
      throw new Error('Unhandled action')
    }
  }
}
