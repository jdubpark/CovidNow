const
  path = require('path'),
  webpack = require('webpack'),
  libPath = './public/lib/';

const API_URL = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8012/'),
};

// check environment mode
const enviro = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: 'development',

  entry: {
    // 'vendor': [
    //   'whatwg-fetch', // fetch polyfill
    //   'babel-polyfill', // async, await
    // ],
    'universal': `${libPath}js/custom/universal.js`,
    'home': `${libPath}js/custom/home.js`,
    'states': `${libPath}js/custom/states.js`,
  },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, `${libPath}js/dist/`),
    filename: '[name].bundle.js',
  },

  watch: true,
  watchOptions: {
    poll: true, // keep watching // https://github.com/webpack/webpack/issues/2297
  },

  resolve: {
    extensions: ['*', '.js', '.es6', '.ts', '.tsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, `${libPath}`),
      'node_modules',
    ],
  },

  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true,
  },

  module: {
    rules: [
      {
        test: /\.(es6|js)$/,
        include: [
          path.resolve(__dirname, `${libPath}js/custom/`),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015'],
          },
        }],
      },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //     loader: 'style-loader', // creates style nodes from JS strings
      //   }, {
      //     loader: 'css-loader', // translates CSS into CommonJS
      //   }, {
      //     loader: 'sass-loader', // compiles Sass to CSS
      //     options: {
      //       includePath: path.resolve(__dirname, `${libPath}lib/style/`),
      //     },
      //   }],
      // },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': API_URL[enviro],
    }),
  ],
};
