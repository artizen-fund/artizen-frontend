module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-css-user-preferences',
    'storybook-addon-swc',
  ],
  features: { modernInlineRender: true },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
}
