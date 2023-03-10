import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Layout, Spinner, Table, TableCell, PagePadding, Project } from '@components'
import { GET_PROJECTS } from '@gql'
import { IProjectsQuery, IProjectFragment } from '@types'
import { typography, palette } from '@theme'
import { rgba } from '@lib'

const Projects = () => {
  const { push } = useRouter()

  return (
    <Layout>
      <StyledPagePadding>
        <Wrapper>
          <Title className="doubleWith">Welcome to Artizen Admin Area:</Title>

          <MainAreaButton className="center-align" onClick={() => push('/admin/seasons')}>
            Seasons
          </MainAreaButton>
          <MainAreaButton className="center-align" onClick={() => push('/admin/projects')}>
            Projects
          </MainAreaButton>
        </Wrapper>
      </StyledPagePadding>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  .doubleWith {
    grid-column: span 2;
  }

  .center-align {
    align-self: center;
    justify-self: center;
  }
`

const MainSessionWapper = styled.div`
  display: flex;
  flex-direction: row;
`

const MainAreaButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${rgba(palette.stone, 0.24)};
  border-radius: 0.5rem;
  padding: 1rem;
  height: 130px;
  width: 200px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${rgba(palette.stone, 0.24)};
  &:hover {
    background-color: ${rgba(palette.stone)};
  }
  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: ${rgba(palette.barracuda)};
    }
  }
`

const Title = styled.div`
  ${typography.label.l1}
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  max-width: 800px;
  min-height: 75vh;
  margin: auto;
`

export default Projects
