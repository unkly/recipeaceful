module.exports = {
  stories: [
    {
      directory: '../../web/src',
      titlePrefix: 'web'
    },
    {
      directory: '../../../../packages/ui/src',
      titlePrefix: 'ui'
    }
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true
  },
  typescript: {
    reactDocgenTypescriptOptions: {
      // この設定は monorepo 配下にある各種コンポーネントの JSDoc を認識させるために必要。
      // ref: https://github.com/storybookjs/storybook/issues/21399#issuecomment-1473800791
      include: ['../../../**/*.tsx']
    }
  }
}
