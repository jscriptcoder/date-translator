const path = require("path")
const webpack = require("webpack")
const nodeExternals = require('webpack-node-externals')

module.exports = env => {

  const prod = env && env.production

  return {
    mode: prod ? 'production' : 'development',
    entry: `./src/${prod ? 'DateTranslator.js' : 'example.js'}`,
    output: {
      path: path.resolve(__dirname, prod ? 'lib/' : 'example/'),
      filename: 'index.js'
    },
    externals: prod ? [ nodeExternals() ] : {},
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|)/,
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-async-to-generator"
            ]
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ],
    devServer: {
      contentBase: path.join(__dirname, "example/"),
      port: 5000,
      hotOnly: true,
      open: true,
    },
    devtool: prod ? false : 'source-map',
  }
}
