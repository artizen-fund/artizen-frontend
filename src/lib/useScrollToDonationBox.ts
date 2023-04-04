import { useRouter } from 'next/router'

// note: this is all deprecated

export const useScrollToDonationBox = () => {
  const { pathname, push } = useRouter()
  return () => {
    if (pathname === '/grants/today' || '/grants/[blockchainId]') {
      const grantExplorer = document.querySelector('#donation-box')
      grantExplorer?.scrollIntoView({ behavior: 'smooth' })
    } else {
      push('/grants/today')
    }
  }
}
