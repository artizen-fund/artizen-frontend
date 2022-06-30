import { SessionState, checkoutMethods } from './state'
import { SessionAction } from './actions'

/* "hey were are the other actions?"
 * see ./dispatchMiddleware
 */

export const reducer = (state: SessionState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case 'SET_AMOUNT': {
      const minAmountForMethod = checkoutMethods[state.checkoutMethod].minimum
      return {
        ...state,
        amount: action.payload.amount < minAmountForMethod ? minAmountForMethod : action.payload.amount,
      }
    }
    case 'SET_CHECKOUT_METHOD': {
      const minAmountForMethod = checkoutMethods[action.payload.checkoutMethod].minimum
      return {
        ...state,
        checkoutMethod: action.payload.checkoutMethod,
        amount: state.amount < minAmountForMethod ? minAmountForMethod : state.amount,
      }
    }
    case 'SET_CHECKOUT_STAGE': {
      return { ...state, checkoutStage: action.payload.checkoutStage }
    }

    default: {
      // note: thanks to typescript rules, this should be un-reachable
      throw new Error('Unhandled action')
    }
  }
}
