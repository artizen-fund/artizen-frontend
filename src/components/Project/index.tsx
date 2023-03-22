import styled from 'styled-components'
import { palette, typography, breakpoint } from '@theme'
import { rgba } from '@lib'
import { IProjectFragment, Maybe } from '@types'
import { capitalCase } from 'capital-case'

interface ProjectProps {
  projectData: IProjectFragment
  displayType: 'brief' | 'full'
}

export default function Project({ projectData, displayType }: ProjectProps): JSX.Element {
  const { title, metadata, walletAddress, impactTags, artifacts, logline, members } = projectData

  const leadMember = members?.find(member => member.type === 'lead')?.user

  return (
    <Wrapper displayType={displayType}>
      <ArtifactImage artwork={artifacts[0].artwork} displayType={displayType} />
      {displayType === 'brief' && <Headline>{title && capitalCase(title)}</Headline>}
      <Item>
        <b>Logline:</b> {logline}
      </Item>
      <Item>
        <b>By:</b> {capitalCase(`${leadMember?.firstName} ${leadMember?.lastName}`)}
      </Item>
      <Item>
        <b>Impact Tags:</b> {impactTags}
      </Item>
      <Item>
        <b>Project Wallet:</b> {walletAddress}
      </Item>
      {displayType === 'full' &&
        metadata?.map(({ title, value }: any, index: number) => (
          <Item key={index}>
            <b>{title}:</b> {value}
          </Item>
        ))}
    </Wrapper>
  )
}

const ArtifactImage = styled.div<{ artwork?: Maybe<string>; displayType: string }>`
  justify-content: center;
  align-items: center;
  width: ${props => (props.displayType === 'brief' ? '90px' : '360px')};
  height: ${props => (props.displayType === 'brief' ? '90px' : '360px')};
  text-align: center;
  grid-row: 1 / span 9;

  color: ${rgba(palette.night)};
  background-color: ${rgba(palette.stone)};
  background-image: url(${props => props.artwork});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.barracuda)};
  }
`

const Wrapper = styled.div<{ displayType: string }>`
  display: grid;
  width: 100%;
  grid-template-rows: ${props => (props.displayType === 'brief' ? '1fr 1fr 1fr  1fr' : 'repeat(7, auto)')};
  grid-template-columns: ${props => (props.displayType === 'brief' ? '104px 1fr' : ' 1fr 1fr')};
`

const Headline = styled.div`
  width: 100%;

  ${typography.body.l2}
  font-weight: 600;
`

const Item = styled.div`
  width: 100%;
  margin: 0 0 0.5rem 0;
  ${typography.body.l3};
`
