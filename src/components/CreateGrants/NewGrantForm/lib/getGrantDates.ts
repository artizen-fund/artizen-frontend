import moment from 'moment-timezone'

export const getGrantDates = (startingDate: moment.Moment, length: number) => {
  /* Note on queueing grants!
     We want grants to start one second later (ex. 00:00:01) so that
     there is no overlap with a previous grant that ends at 00:00:00.
     
     sanitizeGrantDates('2022-12-20T00:00:00', 24 * 60)
     output: [
       2022-12-20T00:00:01,
       2022-12-21T00:00:00
     ]
  */

  const starting = startingDate.add(1, 's').format('YYYY-MM-DDTHH:mm:ss')
  const closing = startingDate.add(length, 'h').format('YYYY-MM-DDTHH:mm:ss')
  return [starting, closing]
}
