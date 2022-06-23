import type { MagicUserMetadata } from 'magic-sdk'

export {}

declare global {
  interface ArtizenUser extends MagicUserMetadata {
    token?: string
    id?: string
  }

  interface SimpleComponentProps {
    children?: React.ReadNode
    className?: string
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element
}
