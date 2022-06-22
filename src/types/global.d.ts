import type { MagicUserMetadata } from 'magic-sdk'

interface ArtizenUser extends MagicUserMetadata {
  token?: string
  id?: string
}

interface SimpleComponentProps {
  children?: React.ReadNode
  className?: string
}

declare global {
  ArtizenUser, SimpleComponentProps
}

export {}
