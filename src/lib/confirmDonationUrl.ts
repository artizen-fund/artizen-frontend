export const getConfirmDonationURL = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/crowdfunding/confirmDonation`
}
