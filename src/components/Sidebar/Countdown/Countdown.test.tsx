/* important todo: Snapshots don't like to work with this thing!
 *
 * This could be fixed -- in theory -- by feeding it a date value that is always
 * "one minute ago". Then every snapshot would record a time of five minutes ago.
 *
 * But say the time is 12:05:59:99, and the countdown timer runs a millisecond later.
 * It might record a snapshot of 12:00 or 12:01, and won't match a prior snapshot.
 *
 * "Maybe this component doesn't need snapshots…" Agreed, but <Sidebar /> also breaks
 * because it includes this thing.
 *
 * I think we have to adjust this component to just not run on SSR (where the figure
 * would be perpetually inaccurate anyway) and on test scripts.
 */

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Countdown from './'

describe('Countdown', () => {
  it('renders Countdown unchanged', () => {
    const { container } = render(<Countdown date="2022-06-30T00:00:00" />)
    expect(container).toMatchSnapshot()
  })
})
