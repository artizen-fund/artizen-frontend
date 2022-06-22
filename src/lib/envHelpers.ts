import { assertBool } from '@lib'

export const isClient = () => typeof window !== 'undefined'

export const isServer = () => typeof window === 'undefined'

export const isProd = () => assertBool(process.env.NEXT_PUBLIC_PROD, 'NEXT_PUBLIC_PROD')
