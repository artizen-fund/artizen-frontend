import { isClient } from './envHelpers'

const getConfirmDonationURL = () => {
  return isClient()
    ? `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }/confirmDonation`
    : ''
}

export { getConfirmDonationURL }
