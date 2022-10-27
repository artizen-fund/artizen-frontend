# Introduction

This tool introduces negative margins above and below a block of text, in order to make the top and bottom of the block line up flush with the top and bottom of the typeface letterforms.

You can read [https://css-tricks.com/how-to-tame-line-height-in-css/](an overview) of why typefaces line up the way they do, and a general theory on how to "fix" it.

This code is based on [http://text-crop.eightshapes.com](the EightShapes text-crop mixin tool), tailored for our use in styled-components.

## Usage

```
const FlushBlock = styled.div`
  ${textCrop(typography.title.l1)}
`
```

You might want to apply the crop to a div that contains the type, rather than to the type itself. In such an instance, you might also not want the bottom crop, or a different bottom crop for a different type size.

```
const Wrapper = styled.div`
  ${textCrop(typography.title.l1, { noBottomCrop: true, justBox: true })}
  ${textCrop(typography.body.l1, { noTopCrop: true, justBox: true })}
  h1 {
    ${typography.title.l1}
  }
  p {
    ${typography.body.l1}
  }
`
```

## Options

### justBox

You may have an instance where child components have the typographic styles, but the box hack needs to be applied to the wrapper.

```
const Wrapper = styled.div`
  ${textCrop(typography.title.l1, { justBox: true })}
`

const Copy = styled.div`
  ${typography.title.l1}
`

<Wrapper>
  <Copy>blah blah</Copy>
</Wrapper>
```

### topAdjustment, bottomAdjustment

You can manually add artificial "padding" to the top or bottom alignment.

```
const BoxThatRidesABitLowerThanAdjacentContent = styled.div`
  ${textCrop(typgraphy.title.l1, { top: 20 })
```

### noBottomCrop, noTopCrop

You may have an instance where _only_ the top (or bottom) should have the box hack.

```
const BoxThatIsOnlyCroppedOnTop = styled.div`
  ${textCrop(typgraphy.title.l1, { noBottomCrop: true })
`
```

### lineHeight

If you want to specify a different line height, you will need to feed a new calculation to the tool. (measured in em units)

```
const TitleLevel1WithLineHeight = styled.div`
  ${textCrop(typgraphy.title.l1, { lineHeight: 2 })
`
```
