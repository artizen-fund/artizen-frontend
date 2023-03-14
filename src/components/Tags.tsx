import styled from 'styled-components'
import { Button } from '@components'

const Tags = ({ tags }: { tags: Array<string> }) => (
  <Wrapper>
    {tags.map((tag, i) => (
      <li key={`tag-${i}`}>
        <Button level={2} outline href="/">
          {tag}
        </Button>
      </li>
    ))}
  </Wrapper>
)

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 2em 0;
`

export default Tags
