import styled from 'styled-components'
import { Button, Glyph } from '@components'
import { IUserPublicFragment } from '@types'
import { breakpoint, palette } from '@theme'
import { rgba, sizeForLevel } from '@lib'

interface ICreatorBox {
  member: IUserPublicFragment
}

const CreatorBox = ({ member }: ICreatorBox) => {
  console.log('member', member)
  return (
    <Wrapper>
      <div>
        <AvatarImage profileImage={member.profileImage}>
          {!member.profileImage && <Glyph glyph="face" level={1} color="moon" darkColor="night" />}
        </AvatarImage>
      </div>
      <Copy>
        <Name>
          {member.firstName} {member.lastName}
        </Name>
        <Links>
          {member.twitterHandle && (
            <li>
              <Button glyph="twitter" glyphOnly href={`https://twitter.com/${member.twitterHandle}`} level={2} outline>
                Twitter
              </Button>
            </li>
          )}
          {member.website && (
            <li>
              <Button glyph="globe" glyphOnly href={member.website} level={2} outline>
                {member.website}
              </Button>
            </li>
          )}
        </Links>
      </Copy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 2em 0;
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Name = styled.div``

const Links = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const AvatarImage = styled.div<{ profileImage?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;

  text-align: center;

  background-color: ${rgba(palette.night)};
  border: 1px solid night;
  background-image: url(${props => props.profileImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
  }
  width: ${sizeForLevel('mobile', 0)}px;
  height: ${sizeForLevel('mobile', 0)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: ${sizeForLevel('laptop', 0)}px;
    height: ${sizeForLevel('laptop', 0)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: ${sizeForLevel('desktop', 0)}px;
    height: ${sizeForLevel('desktop', 0)}px;
  }
`

export default CreatorBox
