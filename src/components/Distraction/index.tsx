import styled from 'styled-components'
import { Button } from '@components'
import { assetPath } from '@lib'
import { typography } from '@theme'
import { distraction } from '@copy/donations'

const Distraction = () => {
  return (
    <Wrapper>
      <Image src={`${assetPath(distraction.imageUrl)}?fm=webp`} />
      <DistractionTitle>{distraction.title}</DistractionTitle>
      <Copy>{distraction.copy}</Copy>
      <Button href="https://www.google.com" target="_blank" level={2}>
        Discover More
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Image = styled.img`
  border-radius: 16px;
  max-width: 100%;
`

const DistractionTitle = styled.h3`
  ${typography.title.l4}
`

const Copy = styled.p`
  ${typography.body.l3}
`

export default Distraction
