import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { CloseButton } from '@components'
import { rgba, LayoutContext } from '@lib'
import { palette, typography } from '@theme'

interface IAlertModal {
  headline: string
  message: string
  children?: React.ReactNode
}

const AlertModal = ({ headline, message, children, ...props }: IAlertModal) => {
  const { visibleModal, toggleModal } = useContext(LayoutContext)

  return (
    <Wrapper {...props}>
      <CloseButton onClick={() => toggleModal()} />
      <Headline>{headline}</Headline>
      <Message>{message}</Message>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
`

const Headline = styled.h1`
  ${typography.title.l2}
`

const Message = styled.p`
  ${typography.body.l2}
`

const AlertButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`

export { AlertModal, AlertButtonWrapper }
