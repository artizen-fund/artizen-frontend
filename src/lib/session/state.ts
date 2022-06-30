import { GlyphKey } from '@theme'

type CheckoutMethodParameters = {
  label: string
  glyph: keyof GlyphKey
  minimum: number
}

export const checkoutMethods: Record<CheckoutMethodType, CheckoutMethodParameters> = {
  usd: {
    label: 'Credit Card',
    glyph: 'currencyDollar',
    minimum: 10,
  },
  polygon: {
    label: 'polygon',
    glyph: 'info',
    minimum: 50,
  },
  ethereum: {
    label: 'ethereum',
    glyph: 'info',
    minimum: 100,
  },
}

export type CheckoutStage =
  | 'COLLECTING_FIAT_PAYMENT'
  | 'PROCESSING_FIAT_PAYMENT'
  | 'CONVERTING_FIAT_TO_USDC'
  | 'TRANSFERRING_FIAT_TO_WALLET'
  | 'TRANSFERRING_WALLET_TO_DONATION_CONTRACT'

export interface SessionState {
  user?: ArtizenUser
  amount: number
  method: CheckoutMethodType
  stage?: CheckoutStage
}

const DEFAULT_AMOUNT = 10
const DEFAULT_METHOD = 'usd'

export const initialState: SessionState = {
  amount: DEFAULT_AMOUNT,
  method: DEFAULT_METHOD,
}
