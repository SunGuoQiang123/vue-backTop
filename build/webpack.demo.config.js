const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '..', 'example/main.js')
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.vue', '.js']
  },
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        include: path.join(__dirname, '..', 'lib'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html'
    }),
  ],
  devtool: '#eval-source-map'
};

module.exports = webpackConfig;
