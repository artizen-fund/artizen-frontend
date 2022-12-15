import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { Button } from '@components'
import { palette, typography } from '@theme'
import { GET_ADJACENT_GRANT } from '@gql'
import { IGrantsWithProjectFragment, IGetAdjacentGrantQuery } from '@types'
import { rgba, formatStringDate } from '@lib'

interface IGrantsNavigator {
  grant: IGrantsWithProjectFragment
}

const GrantsNavigator = ({ grant }: IGrantsNavigator) => {
  const { data: prevGrantData } = useQuery<IGetAdjacentGrantQuery>(GET_ADJACENT_GRANT, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: { blockchainId: 'desc' },
      where: {
        _and: [
          {
            status: {
              _eq: 'published',
            },
          },
          {
            closingDate: {
              _lt: grant.startingDate,
            },
          },
          {
            blockchainId: {
              _lt: grant?.blockchainId,
            },
          },
        ],
      },
    },
  })

  const { data: nextGrantData } = useQuery<IGetAdjacentGrantQuery>(GET_ADJACENT_GRANT, {
    fetchPolicy: 'no-cache',
    variables: {
      order_by: { blockchainId: 'asc' },
      where: {
        _and: [
          {
            status: {
              _eq: 'published',
            },
          },
          {
            startingDate: {
              _gt: grant.closingDate,
            },
          },
          {
            blockchainId: {
              _gt: grant.blockchainId,
            },
          },
        ],
      },
    },
  })

  return (
    <Wrapper>
      <Button
        glyphOnly
        glyph="arrow"
        glyphRotation={90}
        href={`/grants/prevGrantData?.Grants?.[0].date`}
        level={2}
        disabled={!prevGrantData?.Grants || prevGrantData.Grants.length < 1}
      >
        previous
      </Button>
      <Copy>
        <GrantDate>Today’s Grant</GrantDate>
        <Description>{formatStringDate(grant.date)}</Description>
      </Copy>
      <Button
        glyphOnly
        glyph="arrow"
        glyphRotation={-90}
        href={`/grants/nextGrantData?.Grants?.[0].date`}
        level={2}
        disabled={!nextGrantData?.Grants || nextGrantData.Grants.length < 1}
      >
        next
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
`

const Copy = styled.header`
  text-align: center;
`

const GrantDate = styled.div`
  ${typography.title.l4}
`

const Description = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

export default GrantsNavigator
