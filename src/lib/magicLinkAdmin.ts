import { Magic } from '@magic-sdk/admin'
import { envString} from '@lib'

// initiating Magic instance for server-side methods
export const magicAdmin = new Magic(envString('MAGIC_SECRET_KEY'))
