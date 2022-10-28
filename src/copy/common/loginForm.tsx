export const loginErrors = {
  invalidEmail: 'Invalid email, please check and try again.',
  linkExpired: 'Login attempt with an expired link. Please click Sign In to retrieve a fresh link.',
  alreadyLoggedIn: 'User is already logged in. You may need to refresh your browser.',
  unknown:
    'There was an error with your login. Please refresh and try again. If the error persists, please contact us for assistance.',
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
