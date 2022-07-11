import React from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { assetPath } from '@lib'
import { breakpoint, palette, typography } from '@theme'

export interface IAlternatingPanel {
  image: string
  imageDark?: string
  title: string
  copy: string
  subtitle: string
  buttonLabel: string
  imageOnRight?: boolean
}

const AlternatingPanel = ({
  image,
  imageDark,
  title,
  copy,
  subtitle,
  buttonLabel,
  imageOnRight,
}: IAlternatingPanel) => {
  return (
    <Wrapper {...{ imageOnRight }}>
      <Image {...{ image, imageDark }} />
      <Content>
        <Title>{title}</Title>
        <Copy>{copy}</Copy>
        <SubTitle>{subtitle}</SubTitle>
        <Button href="/">{buttonLabel}</Button>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<IAlternatingPanel, 'imageOnRight'>>`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: ${props => (props.imageOnRight ? 'row' : 'row-reverse')};
    align-items: stretch;
  }
`

const Image = styled.div<Pick<IAlternatingPanel, 'image' | 'imageDark'>>`
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  background-image: url(${props => assetPath(props.image)});
  ${props =>
    props.imageDark &&
    `
    @media (prefers-color-scheme: dark) {
      background-image: url(${assetPath(props.imageDark)});
    }
  `}
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    min-width: 50%;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: 40px 0;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    min-width: 50%;
    padding: 0 45px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 0 65px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 0 80px;
  }
`

const Title = styled.h2`
  ${typography.title.l2}
`

const Copy = styled.p`
  ${typography.body.l2}
`

const SubTitle = styled.h3`
  ${typography.label.l1}
  color: ${palette.barracuda};
`

export default AlternatingPanel
