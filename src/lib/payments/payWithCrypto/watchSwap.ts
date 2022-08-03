import { CryptoStageFunction } from './'

// all the watchers for this stage of the crypto transaction are here

const watchSwap: CryptoStageFunction = (setStatus, setMessage) => {
  setStatus('PROCESSING')
  setMessage('whatever my dude')
  // begin work
  // initialize whatever webhooks or watchers are necessary to get updates
  return
}

export default watchSwap
