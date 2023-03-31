import { PinataPinResponse } from '@pinata/sdk'
import { IProjectFragment, ISeasonFragment } from '@types'

const mockSeason: ISeasonFragment = {
  __typename: 'Seasons',
  id: 'abc123',
  startingDate: '',
  endingDate: '',
}
const mockSubmission: IProjectFragment = {
  __typename: 'Projects',
}
export { mockSeason, mockSubmission }
