import styled from 'styled-components'
import { Table, TableCell, TableProps } from './'

const story = {
  title: 'tables/Table',
  component: Table,
  argTypes: {
    title: {
      defaultValue: 'sample table',
      control: { type: 'text' },
    },
  },
}
export default story

export const TableComponent = (props: TableProps) => {
  const data = ['herp', 'derp', 'doop', 'dorp', 'donk', 'bonk']
  return (
    <Wrapper>
      <Table {...props}>
        {data.map((datum, index) => (
          <TableCell key={index}>
            <Row>
              <span>#{index}</span>
              <Avatar />
            </Row>
            <div>{datum}</div>
          </TableCell>
        ))}
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 500px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
`

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  background-color: red;
`
