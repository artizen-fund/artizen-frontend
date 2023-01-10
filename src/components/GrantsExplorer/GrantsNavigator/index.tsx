import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { Button } from '@components'
import { palette, typography } from '@theme'
import { GET_ADJACENT_GRANT } from '@gql'
import { IGrantsWithProjectFragment, IGetAdjacentGrantQuery } from '@types'
import { rgba, formatDate, isCurrentGrant, ARTIZEN_TIMEZONE } from '@lib'

interface IGrantsNavigator {
  grant: IGrantsWithProjectFragment
}

const GrantsNavigator = ({ grant }: IGrantsNavigator) => {
  const {
    query: { blockchainId },
  } = useRouter()

  const loadingAngelesTime = moment.tz(ARTIZEN_TIMEZONE).format()

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
            blockchainId: {
              _lt: grant?.blockchainId,
            },
          },
        ],
      },
    },
  })
  const previousGrantLink = `/grants/${prevGrantData?.Grants?.[0]?.blockchainId || 'today'}`

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
            blockchainId: {
              _gt: grant.blockchainId,
            },
          },
          {
            startingDate: {
              _lt: loadingAngelesTime,
            },
          },
        ],
      },
    },
  })

  const nextGrantLink =
    isCurrentGrant(nextGrantData?.Grants?.[0]) || isCurrentGrant(grant)
      ? 'today'
      : `/grants/${nextGrantData?.Grants?.[0]?.blockchainId}`

  return (
    <Wrapper>
      <Button
        glyphOnly
        glyph="arrow"
        glyphRotation={90}
        href={previousGrantLink}
        level={2}
        disabled={!prevGrantData?.Grants || prevGrantData.Grants.length < 1}
      >
        previous
      </Button>
      <Copy>
        <GrantDate>{blockchainId === 'today' ? 'Today’s Grant' : `Grant #${grant.blockchainId}`}</GrantDate>
        <Description>{formatDate(grant.startingDate)}</Description>
      </Copy>
      <Button
        glyphOnly
        glyph="arrow"
        glyphRotation={-90}
        href={nextGrantLink}
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
