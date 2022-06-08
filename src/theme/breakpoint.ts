export type ResponsiveSize = 'mobile' | 'tablet' | 'laptop' | 'desktop'

type BreakPoint = Record<ResponsiveSize, number>

export const breakpoint: BreakPoint = {
  desktop: 1680,
  laptop: 1200,
  tablet: 744,
  mobile: 320,
}
