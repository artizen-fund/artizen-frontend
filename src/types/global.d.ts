import type { MagicUserMetadata } from 'magic-sdk'

declare global {
  interface SimpleComponentProps {
    children?: React.ReadNode
    className?: string
    onClick?: (input?: any) => void
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element
}

export {}
