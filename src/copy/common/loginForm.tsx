export const loginErrors = {
  invalidEmail: 'This email’s invalid. Double-check and try again.',
  linkExpired: 'This login link is expired. Click “Sign in” to retrieve a fresh link.',
  alreadyLoggedIn: 'Looks like you’re already logged in. Try refreshing your browser.',
  unknown:
    'There was an error with your login. Refresh your browser and try again. If the error persists, contact us for assistance.',
}

export const loginCopy = {
  headline: 'Let’s get started by setting up your Artizen account',
  directions: (
    <>
      Already have an account?
      <br />
      You can still use this form, it’s magic!
    </>
  ),
  signinButton: 'Sign In',
  confirmationHeadline: 'Done, confirmation sent!',
  confirmationCopy: (email: string) => (
    <>
      We emailed a magic link to ${email}.
      <br />
      Click the link to sign in or sign up.
    </>
  ),
  resetButton: 'Didn’t receive an email?',
  rememberEmailCheck: 'Remember my email address.',
}
