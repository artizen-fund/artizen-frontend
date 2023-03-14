import { useEffect } from 'react'
import styled from 'styled-components'
import { Icon, Button } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

interface ICreatorBox {
  name: string
  avatar?: string
  twitterHandle: string
  url: string
}

const CreatorBox = ({ name, avatar, twitterHandle, url }: ICreatorBox) => (
  <Wrapper>
    <div>
      <Icon glyph="face" />
    </div>
    <Copy>
      <Name>{name}</Name>
      <Links>
        <li>
          <Button glyph="twitter" glyphOnly href={`https://twitter.com/${twitterHandle}`} level={2} outline>
            Twitter
          </Button>
        </li>
        <li>
          <Button glyph="globe" glyphOnly href={url} level={2} outline>
            {url}
          </Button>
        </li>
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
