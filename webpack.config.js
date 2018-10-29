const path = require("path");
const webpack = require("webpack");

module.exports = env => {

  const isExample = !env

  return {
    mode: isExample ? 'development' : 'production',
    entry: `./src/${isExample ? 'example.js' : 'DateTranslator.js'}`,
    output: {
      path: path.resolve(__dirname, isExample ? 'example/' : 'lib/'),
      filename: 'index.js'
    },
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
      port: 3000,
      hotOnly: true
    },
    devtool: isExample ? 'source-map' : false,
  }
}
