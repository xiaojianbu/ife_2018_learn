const path = require('path')
const glob = require('glob')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const final = buildEntriesAndHTML()

// 用来构建entry
function buildEntriesAndHTML() {
  const result = glob.sync('src/**/*.js')
  const config = {
    hash: true,
    inject: true
  }
  const entries = {}
  const htmls = []
  result.forEach(item => {
    const one = path.parse(item)
    const outputfile = one.dir.split('/').slice(-1)[0]
    entries[outputfile] = './' + item
    htmls.push(
      new HtmlWebpackPlugin({
        ...config,
        template: 'index.html',
        filename:
          outputfile === 'index'
            ? './index.html'
            : './' + outputfile + '/index.html',
        // 输出html文件的路径
        chunks: [outputfile]
      })
    )
  })
  return {
    entries,
    htmls
  }
}

module.exports = {
  entry: final.entries,
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: 'IFE SAN'
    }),
    ...final.htmls
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.san$/,
        loader: 'san-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      san:
        process.env.NODE_ENV === 'production'
          ? 'san/dist/san.js'
          : 'san/dist/san.dev.js'
    }
  }
}
