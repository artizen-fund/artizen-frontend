export type StageStatus = 'WAITING' | 'PROCESSING' | 'COMPLETE'

export type StageFunction = (setStatus: (s: StageStatus) => void, setMessage: (s: string) => void) => void
