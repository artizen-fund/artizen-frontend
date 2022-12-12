// import { rgba } from '@lib'
// import { palette } from '@theme'

interface ITheme {
  root?: React.CSSProperties
  // ^ this is like the space where the toast "lands"
  toast?: React.CSSProperties
  // ^ wrapper
  body?: React.CSSProperties
  // ^ content
  dismiss?: React.CSSProperties
  // ^ button visible on hover
  message?: {
    contents?: React.CSSProperties
    // ^ wrapper for all of below
    title?: React.CSSProperties
    // ^ first line of text (def bold)
    textBlock?: React.CSSProperties
    // ^ second line of text (def grey)
    icon?: React.CSSProperties
    // ^ yup that's an icon
    actionBlock?: React.CSSProperties
    // ^ not using yet
    body?: React.CSSProperties
    // ^ not using yet
  }
  progressBar?: React.CSSProperties
}

const theme: ITheme = {
  root: {},
  toast: {},
  body: {},
  dismiss: {},
  message: {
    contents: {},
    textBlock: {},
    icon: {},
  },
}

export default theme
