import { CheckoutStage } from './state'

export type SET_AMOUNT = {
  type: 'SET_AMOUNT'
  payload: {
    amount: number
  }
}

export type SET_CHECKOUT_METHOD = {
  type: 'SET_CHECKOUT_METHOD'
  payload: {
    checkoutMethod: CheckoutMethodType
  }
}

export type SET_CHECKOUT_STAGE = {
  type: 'SET_CHECKOUT_STAGE'
  payload: {
    checkoutStage: CheckoutStage
  }
}

export type SET_USER = {
  type: 'SET_USER'
  payload: {
    user?: ArtizenUser
  }
}

export type CREATE_SESSION = {
  type: 'CREATE_SESSION'
  payload: {
    email: string
  }
}

export type END_SESSION = {
  type: 'END_SESSION'
}

export type CHECK_SESSION = {
  type: 'CHECK_SESSION'
}

export type SessionAction =
  | SET_AMOUNT
  | SET_CHECKOUT_METHOD
  | SET_CHECKOUT_STAGE
  | CREATE_SESSION
  | END_SESSION
  | CHECK_SESSION
  | SET_USER

export type Dispatch = (action: SessionAction) => void
