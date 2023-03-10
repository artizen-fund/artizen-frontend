import styled from 'styled-components'
import { palette, typography, breakpoint } from '@theme'
import { rgba } from '@lib'
import { IProjectFragment, Maybe } from '@types'

interface ProjectProps {
  projectData: IProjectFragment
  displayType: 'brief' | 'full'
}

export default function Project({ projectData, displayType }: ProjectProps): JSX.Element {
  const { title, metadata, walletAddress, impactTags, artifacts, logline, members } = projectData

  console.log('metadata ', metadata)

  const leadMember = members?.find(member => member.type === 'lead')?.user

  return (
    <Wrapper displayType={displayType}>
      <ArtifactImage artwork={artifacts[0].artwork} displayType={displayType} />
      {displayType === 'brief' && <Headline>{title?.toLocaleUpperCase()}</Headline>}
      <Item>
        <b>Logline:</b> {logline}
      </Item>
      <Item>
        By: {leadMember?.firstName} {leadMember?.lastName}
      </Item>
      <Item>Impact Tags: {impactTags}</Item>
      <Item>Project Wallet: {walletAddress}</Item>
      {displayType === 'full' &&
        metadata?.map(({ title, value }: any, index: number) => (
          <Item key={index}>
            {title}: {value}
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
  grid-template-rows: ${props => (props.displayType === 'brief' ? '1fr 1fr 1fr  1fr' : ' repeat(7, 40px)')};
  grid-template-columns: ${props => (props.displayType === 'brief' ? '104px 1fr 1fr' : ' 1fr 1fr')};
  height: 100%;
`

const Headline = styled.div`
  width: 100%;
  ${typography.body.l2}
`

const Item = styled.div`
  width: 100%;
  ${typography.body.l3}
`
