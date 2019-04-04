const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const htmlHandler = require('./html-handler');

function getEntries(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    console.log(entry);
    const tmp = entry.split('/').splice(-2)
    entries[tmp[0]] = ['eventsource-polyfill', entry]
  })
  return entries
}

const plugins = [
  new VueLoaderPlugin()
]

module.exports = {
  mode: 'development',
  entry: getEntries('./src/**/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
        }]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader', 
                {
                  loader: 'css-loader'
                }
              ]
            }
          }
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: plugins.concat(
    htmlHandler({
      chunks: ['manifest', 'vendor']
    })
  ),
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   name: 'common',
        //   test: /\.css$/,
        //   chunks: 'initial',
        //   enforce: true
        // },
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 1
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /node_modules\/\*\*\/\.js$/,
          chunks: "initial",
          priority: -10,
          minChunks: 1,
        }
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      dist: path.resolve(__dirname, '../dist')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: '127.0.0.1',
    port: 8009,
    // proxy: {
    //   'api': {
    //     target: 'http://127.0.0.1:8009',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    historyApiFallback: true
  }
}
