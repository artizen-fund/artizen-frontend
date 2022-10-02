import { useEffect } from 'react'
import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { palette, typography } from '@theme'

interface ISettingsFormHeader {
  title: string
  subtitle: string
  imgPath: string
}

const SettingsFormHeader = ({ title, subtitle, imgPath }: ISettingsFormHeader) => (
  <Wrapper>
    <img src={`${assetPath(imgPath)}?fm=webp`} alt="header image" />
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 48px;
  margin-bottom: 48px;
  border-bottom: 1px solid ${rgba(palette.stone)};

  img {
    max-width: 100%;
  }
  text-align: center;
`

const Title = styled.h2`
  ${typography.title.l2}
`

const Subtitle = styled.p`
  color: ${rgba(palette.barracuda)};
  ${typography.label.l1}
`

export default SettingsFormHeader
