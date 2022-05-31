const { generateTemplateFiles } = require('generate-template-files')

const config = require('../package.json')

generateTemplateFiles([
  {
    option: 'React Component',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './tools/templates/component/',
    },
    stringReplacers: ['__name__'],
    output: {
      path: './src/components/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
    },
  },
])
