export type ResponsiveSize = 'mobile' | 'tablet' | 'laptop' | 'desktop'

type BreakPoint = Record<ResponsiveSize, number>

export const breakpoint: BreakPoint = {
  desktop: 1280,
  laptop: 1024,
  tablet: 744,
  mobile: 320,
}
