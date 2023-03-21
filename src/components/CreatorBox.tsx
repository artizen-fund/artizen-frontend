import styled from 'styled-components'
import { Icon, Button } from '@components'
import { IUserPublicFragment } from '@types'

interface ICreatorBox {
  member: IUserPublicFragment
}

const CreatorBox = ({ member }: ICreatorBox) => (
  <Wrapper>
    <div>
      <Icon glyph="face" />
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
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

export default CreatorBox
