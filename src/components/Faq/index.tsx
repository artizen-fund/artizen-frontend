import { useState } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { Glyph, PagePadding } from '@components'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import { faq } from '@copy/home'

const Faq = () => {
  return (
    <PagePadding black>
      <List>
        {faq.map((pair, index) => (
          <QaPair key={`faq-item-${index}`} {...pair} />
        ))}
      </List>
    </PagePadding>
  )
}

const List = styled.dl``

const QaPair = ({ question, answer, ...props }: { question: string; answer: string }) => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Wrapper {...props}>
      <Question {...{ collapsed }} onClick={() => setCollapsed(!collapsed)}>
        {question}
        <Glyph glyph={collapsed ? 'mathPlus' : 'mathMinus'} level={2} color="moon" darkColor="moon" />
      </Question>
      <Answer closed={collapsed}>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </Answer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-top: 1px solid ${rgba(palette.barracuda, 0.64)};
  padding: 24px 20px;
`

const Question = styled.dt<{ collapsed: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  position: relative;
  ${typography.title.l3}
  color: white;
  cursor: pointer;
`

const Answer = styled(props => <SlideDown {...props} />)<{ collapsed: boolean }>`
  ${typography.body.l1}
  will-change: height;
  > * {
    color: ${rgba(palette.stone)};
  }
  > p {
    padding-bottom: 1em;
  }
`

export default Faq
