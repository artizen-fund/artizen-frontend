import styled from 'styled-components'
import { assetPath } from '@lib'
import { breakpoint, typography } from '@theme'
import { partners as copy } from '@copy/home'
import { PagePadding } from '@components'
import { useQuery } from '@apollo/client'
import { IGetSponsorsQuery } from '@types'
import { GET_SPONSORS } from '@gql'
import Link from 'next/link'

const PartnersRibbon = () => {
  const {
    loading,
    data: loadedSponsors,
    error,
  } = useQuery<IGetSponsorsQuery>(GET_SPONSORS, {
    fetchPolicy: 'no-cache',
  })

  return (
    <>
      {!loading && loadedSponsors && loadedSponsors.Sponsors.length > 0 && (
        <PagePadding>
          <Label>{copy.label}</Label>
          <Inner>
            <Wrapper>
              <Partners>
                {[...loadedSponsors.Sponsors, ...loadedSponsors.Sponsors].map(({ name, logotype, url }, index) => {
                  return (
                    <Partner key={`partner-${name}-${index}`}>
                      <Link href={url} passHref={true}>
                        <img src={logotype} alt={name} />
                      </Link>
                    </Partner>
                  )
                })}
              </Partners>
            </Wrapper>
          </Inner>
        </PagePadding>
      )}
    </>
  )
}

const Inner = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 5rem;
`

const Wrapper = styled.div`
  // display: flex;
  // gap: 15px;
  // flex-direction: row;
  // @media only screen and (min-width: ${breakpoint.tablet}px) {
  //   flex-direction: row;
  //   justify-content: space-around;
  //   align-items: center;
  // }
  position: absolute;
  display: flex;
`

const Label = styled.h2`
  ${typography.label.l1}
`

const Partners = styled.ul`
  display: flex;
  align-items: flex-end;
  animation: swipe 50000ms linear infinite backwards;
  @keyframes swipe {
    to {
      transform: translate(-50%);
    }
  }
`

const Partner = styled.li`
  img {
    max-height: 56px;
    width: 200px;
    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
    padding: 0 25px;
    object-fit: cover;
  }
  img:last-of-type {
    padding-left: 0;
  }
`

export default PartnersRibbon
