import { Table, TableCell } from '@components'
import { useProcessDonation } from '@lib'

const DonationSummary = () => {
  const { amount, fee } = useProcessDonation()
  return (
    <Table title="Donation Summary">
      <TableCell>
        <div>Donation: </div>
        <div>${amount} USD</div>
      </TableCell>
      <TableCell>
        <div>Transaction fee:</div>
        <div>${fee} USD</div>
      </TableCell>
      <TableCell highlight>
        <div>Purchase total:</div>
        <div>${(amount as number) + (fee || 0)} USD</div>
      </TableCell>
    </Table>
  )
}

export default DonationSummary
