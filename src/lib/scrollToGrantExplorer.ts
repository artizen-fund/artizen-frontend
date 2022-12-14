export const scrollToGrantExplorer = () => {
  const grantExplorer = document.querySelector('#grant-explorer')
  grantExplorer?.scrollIntoView({ behavior: 'smooth' })
}
