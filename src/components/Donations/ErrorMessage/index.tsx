import styled from 'styled-components'
import { Button } from '@components'
import { assetPath, useProcessDonation } from '@lib'
import { typography } from '@theme'
import { errorMessage } from '@copy/donations'

const ErrorMessage = () => {
  const { error, restart, retry } = useProcessDonation()
  return (
    <Wrapper>
      <Image src={`${assetPath(errorMessage.imageUrl)}?fm=webp`} />
      <DarkImage src={`${assetPath(errorMessage.imageUrlDark)}?fm=webp`} />
      <DistractionTitle>{errorMessage.title}</DistractionTitle>
      <Copy>{error || errorMessage.copy}</Copy>
      <Buttons>
        <Button onClick={restart} level={1} stretch>
          Resume Transaction
        </Button>
        <Button onClick={retry} level={1} stretch>
          Start Over
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex-area: error;
`

const Image = styled.img`
  max-width: 100%;
  @media (prefers-color-scheme: dark) {
    display: none;
  }
`

const DarkImage = styled.img`
  max-width: 100%;
  @media (prefers-color-scheme: light) {
    display: none;
  }
`

const DistractionTitle = styled.h3`
  ${typography.title.l4}
`

const Copy = styled.p`
  ${typography.body.l3}
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`

export default ErrorMessage
