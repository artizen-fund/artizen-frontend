// source: https://support.sendwyre.com/hc/en-us/articles/360059565013-Wyre-card-processing-fees

const calculateFee = (amount: number, nation: string) => {
  // TODO: would be nice to replace `nation: string` with enum of nation codes
  const minimumFee = 5
  const nominalFee = 0.3
  const percentage = nation === 'US' ? 0.029 : 0.039
  const calculatedFee = amount * percentage + nominalFee
  return calculatedFee < minimumFee ? minimumFee : calculatedFee
}

export { calculateFee }
