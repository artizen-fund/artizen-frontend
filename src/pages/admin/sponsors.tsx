import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { rgba, LayoutContext } from '@lib'
import styled from 'styled-components'
import { Button, Layout, Spinner, Table, TableCell, PagePadding, Project, CuratorCheck } from '@components'
import { GET_SPONSORS } from '@gql'
import { IProjectsQuery, ISponsorFragment } from '@types'
import { palette, typography } from '@theme'

const Sponsors = () => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const router = useRouter()
  const {
    loading,
    data: loadedSponsorData,
    error: errorSponsorData,
  } = useQuery(GET_SPONSORS, {
    fetchPolicy: 'no-cache',
  })

  console.log('loadedSponsorData', loadedSponsorData)

  if (errorSponsorData) {
    console.error('errorSponsorData', errorSponsorData)
    return <div>Error loading sponsors</div>
  }

  const openProject = (target: string) => () => {
    router.push(`/admin/projects/${target}`)
  }

  const sideItem = (
    <Button onClick={openProject('new')} level={2} outline>
      Create new Project
    </Button>
  )

  return (
    <Layout>
      <StyledPagePadding>
        <CuratorCheck />
        {loading ? (
          <Spinner />
        ) : (
          <Wrapper>
            <Header>Sponsors List</Header>
            <Button
              level={2}
              onClick={() => {
                setVisibleModalWithAttrs('sponsorModal', {})
              }}
            >
              Add New Sponsor
            </Button>
            <ProjectList className="doubleLeght">
              {loadedSponsorData?.Sponsors.map((sponsor: ISponsorFragment) => {
                return (
                  <ProjectWrapper key={sponsor.id}>
                    <div>{sponsor.name}</div>
                  </ProjectWrapper>
                )
              })}
            </ProjectList>
          </Wrapper>
        )}
      </StyledPagePadding>
    </Layout>
  )
}

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  cursor: pointer;
  background-color: ${rgba(palette.stone, 0.24)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.moon, 0.1)};
  }
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  ${typography.title.l3}
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;
  align-items: center;

  .doubleLeght {
    grid-column: span 2;
  }
`

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

export default Sponsors
