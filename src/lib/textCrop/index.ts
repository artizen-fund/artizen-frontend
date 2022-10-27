import { css, FlattenSimpleInterpolation } from 'styled-components'

const rocGroteskSettings = {
  topCrop: 6,
  bottomCrop: 22,
  cropFontSize: 80,
  cropLineHeight: 1,
}
// ref: http://text-crop.eightshapes.com/?typeface-selection=custom-font&typeface=Lekton&custom-typeface-name=roc-grotesk&custom-typeface-url=https%3A%2F%2Fuse.typekit.net%2Fwwx1oja.css&custom-typeface-weight=700&custom-typeface-style=normal&weight-and-style=700&size=80&line-height=1&top-crop=6&bottom-crop=21

const mackinacProSettings = {
  topCrop: 12,
  bottomCrop: 14,
  cropFontSize: 32,
  cropLineHeight: 1.5,
}
// ref: http://text-crop.eightshapes.com/?typeface-selection=custom-font&typeface=Lekton&custom-typeface-name=p22-mackinac-pro&custom-typeface-url=https%3A%2F%2Fuse.typekit.net%2Fwwx1oja.css&custom-typeface-weight=500&custom-typeface-style=normal&weight-and-style=700&size=32&line-height=1.5&top-crop=12&bottom-crop=14

interface ITextCropOptions {
  topAdjustment?: number
  bottomAdjustment?: number
  noTopCrop?: boolean
  noBottomCrop?: boolean
  lineHeight?: number
  justBox?: boolean
}

export const textCrop = (typeDefinition: FlattenSimpleInterpolation, options?: ITextCropOptions) => {
  const flattenedCSS = typeDefinition.join('')
  const { topCrop, bottomCrop, cropFontSize, cropLineHeight } = typeDefinition.includes('roc-grotesk')
    ? rocGroteskSettings
    : mackinacProSettings

  const topAdjustment = options?.topAdjustment || 0
  const bottomAdjustment = options?.bottomAdjustment || 0
  const adjustedLineHeight = options?.lineHeight || cropLineHeight

  const dynamicTopCrop =
    (Math.max(topCrop + (adjustedLineHeight - cropLineHeight) * (cropFontSize / 2), 0) / cropFontSize) * -1
  const dynamicBottomCrop =
    (Math.max(bottomCrop + (adjustedLineHeight - cropLineHeight) * (cropFontSize / 2), 0) / cropFontSize) * -1

  return css`
    ${options?.justBox ? '' : flattenedCSS}

    &::before,
    &::after {
      display: block;
      height: 0;
      width: 0;
      pointer-events: none;
    }

    &::before {
      ${!options?.noTopCrop && `content: ''`};
      margin-bottom: ${dynamicTopCrop + topAdjustment}em;
    }

    &::after {
      ${!options?.noBottomCrop && `content: ''`};
      margin-top: ${dynamicBottomCrop + bottomAdjustment}em;
    }
  `
}
