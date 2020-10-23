const
  path = require('path'),
  webpack = require('webpack'),
  {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer'),
  libPath = './public/lib/';

const
  apiUrlProd = 'https://covidnow.com/api',
  apiUrlsDev = {
    // API_URL: 'http://localhost:8013/api'
    API_URL_NEWS: 'http://localhost:8013/api',
    API_URL_USA: 'http://localhost:8014/api',
    API_URL_GLOBAL: 'http://localhost:8015/api',
    API_URL_LOCAL: 'http://localhost:8016/api',
  },
  apiUrlsKeys = Object.keys(apiUrlsDev);

function getOptions(nodeEnv){
  const isProd = nodeEnv == 'production';
  const processEnv = {};

  apiUrlsKeys.forEach(key => {
    const url = isProd ? apiUrlProd : apiUrlsDev[key];
    processEnv[key] = JSON.stringify(url);
  });

  const options = {
    mode: 'development',

    node: {
      net: 'empty',
      tls: 'empty',
    },

    entry: {
      'universal': `${libPath}js/src/universal.js`,
      'home': `${libPath}js/src/home.js`,
      'states': `${libPath}js/src/states.js`,
      'read': `${libPath}js/src/read.js`,
    },

    // 'inline-source-map' writes too much on the file,
    // just reference external
    devtool: 'source-map',

    output: {
      path: path.resolve(__dirname, `${libPath}js/dist/`),
      filename: '[name].bundle.js',
    },

    watch: !isProd,
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
              presets: ['@babel/preset-env'],
            },
          }],
        },
      ],
    },

    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerPort: 8888,
      }),
      new webpack.DefinePlugin({
        'process.env': processEnv,
      }),
    ],
  };
  return options;
}

module.exports = (env, argv) => {
  const nodeEnv = argv.mode || 'development';
  return getOptions(nodeEnv);
};
