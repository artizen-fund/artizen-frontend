import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { LayoutContext, rgba } from '@lib'

interface IBreadcrumbArray {
  schema: IBreadcrumb[]
}

interface IBreadcrumb {
  name: string
  path: string
  isActive: boolean
}

const Breadcrumbs = ({ schema }: IBreadcrumbArray) => {
  const { push } = useRouter()
  const { visibleShelf, toggleShelf, visibleModal, toggleModal, locked } = useContext(LayoutContext)
  const onClick = () => {
    if (locked) return
    toggleShelf()
    toggleModal()
  }
  return (
    <Wrapper>
      {schema.map((item: IBreadcrumb, index) => {
        console.log('item  ', item.name)

        return (
          <BreamCrumb key={item.name} className={item.isActive ? 'active' : ''} onClick={() => push(item.path)}>
            {`${index > 0 ? ' / ' : ''}${item.name}`}
          </BreamCrumb>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isModal?: boolean }>`
  width: 100%;
  padding: 5px 0;
  margin: 5px 0;

  ${typography.label.l3}
  font-weight: bold;

  .active {
    font-weight: 100;

    color: ${rgba(palette.barracuda)};
  }

  &:hover .active {
    cursor: default;
    text-decoration: none;
  }
`

const BreamCrumb = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export default Breadcrumbs
