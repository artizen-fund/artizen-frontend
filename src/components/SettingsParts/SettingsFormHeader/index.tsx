import { useEffect } from 'react'
import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { palette, typography } from '@theme'

interface ISettingsFormHeader {
  title: string
  subtitle: string
  imgPath: string
  darkImgPath: string
}

const SettingsFormHeader = ({ title, subtitle, imgPath, darkImgPath }: ISettingsFormHeader) => (
  <Wrapper>
    <Img src={`${assetPath(imgPath)}?fm=webp`} alt="header image" />
    <Img src={`${assetPath(darkImgPath)}?fm=webp`} alt="header image" darkMode />
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

const Img = styled.img<{ darkMode?: boolean }>`
  display: ${props => (props.darkMode ? 'none' : 'block')};
  @media (prefers-color-scheme: dark) {
    display: ${props => (props.darkMode ? 'block' : 'none')};
  }
`

export default SettingsFormHeader
