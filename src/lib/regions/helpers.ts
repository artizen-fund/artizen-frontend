/*
I don't see this changing often enough to justify a live check on every page load,
but if we change our minds, here's the code.

const nationIsSupportedByWyre = async (nationCode: string) => {
  try {
    const response = await fetch('https://api.testwyre.com/v3/widget/supportedCountries', {
      method: 'GET',
      headers: { accept: 'application/json' },
    })
    const supportedNations = response.json() as unknown as Array<string>
    return supportedNations.includes(nationCode)
  } catch (error) {
    console.error('Error retrieving supported nations from Wyre', error)
  }
}
*/

const nationIsSupportedByWyre = (nationCode?: string) => {
  if (!nationCode) return false
  const supportedNations = [
    'DZ',
    'AR',
    'AU',
    'AT',
    'BE',
    'BO',
    'BR',
    'CA',
    'CL',
    'CO',
    'CR',
    'CY',
    'CZ',
    'DK',
    'DO',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HK',
    'IS',
    'IN',
    'ID',
    'IE',
    'IL',
    'IT',
    'JP',
    'LV',
    'LT',
    'LU',
    'MY',
    'MX',
    'NP',
    'NL',
    'NZ',
    'NO',
    'PY',
    'PE',
    'PH',
    'PL',
    'PT',
    'SG',
    'SK',
    'SI',
    'ZA',
    'KR',
    'ES',
    'SE',
    'CH',
    'TZ',
    'TH',
    'TR',
    'GB',
    'US',
    'VN',
  ]
  return supportedNations.includes(nationCode)
}

const stateIsSupported = (stateCode?: string) => {
  if (!stateCode) {
    // if it's not an American state… yeah cool it's supported
    return true
  }
  const unsupportedRegions = ['TX', 'NY']
  return !unsupportedRegions.includes(stateCode)
}

export { nationIsSupportedByWyre, stateIsSupported }
