import type { MagicUserMetadata } from 'magic-sdk'

declare global {
  interface ArtizenUser extends MagicUserMetadata {
    token?: string

    id?: string
    bio?: string
    company?: string
    firstName?: string
    globalRole?: string
    globalTitle?: string
    lastName?: string
    linkedinLink?: string
    profileImage?: string
    twitterLink?: string
    website?: string
  }

  interface SimpleComponentProps {
    children?: React.ReadNode
    className?: string
    onClick?: (input?: any) => void
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element

  export type CheckoutMethodType = 'usd' | 'polygon' | 'ethereum'
}

export {}
