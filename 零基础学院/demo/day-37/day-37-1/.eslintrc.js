module.exports = {
  extends: ['eslint-config-alloy'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // Vue: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // @fixable 一个缩进必须用两个空格替代
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    semi: [2, 'never'],
    'no-unexpected-multiline': 2,
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'space-before-function-paren': 'off',
    'no-void': 'off'
  }
}
