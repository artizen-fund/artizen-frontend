export type ResponsiveSize = 'mobile' | 'phablet' | 'tablet' | 'laptop' | 'desktop'

type BreakPoint = Record<ResponsiveSize, number>

export const breakpoint: BreakPoint = {
  desktop: 1281,
  laptop: 1025,
  tablet: 769,
  phablet: 391,
  mobile: 320,
}
