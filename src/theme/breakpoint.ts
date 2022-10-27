export type ResponsiveSize = 'mobile' | 'phablet' | 'tablet' | 'laptop' | 'laptopXL' | 'desktop'

type BreakPoint = Record<ResponsiveSize, number>

export const breakpoint: BreakPoint = {
  desktop: 1680,
  laptopXL: 1280,
  laptop: 1024,
  tablet: 768,
  phablet: 588,
  mobile: 320,
}
