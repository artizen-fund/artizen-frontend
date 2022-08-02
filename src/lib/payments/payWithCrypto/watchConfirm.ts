import { CryptoStageFunction } from './'

// all the watchers for this stage of the crypto transaction are here

const watchConfirm: CryptoStageFunction = (setStatus, setMessage) => {
  setStatus('PROCESSING')
  setMessage('whatever my dude')
  // begin work
  return
}

export default watchConfirm
