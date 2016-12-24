import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
// import StatsWebpackPlugin from 'stats-webpack-plugin';

export default {
  entry: './src/main.js',
  output: {
    path: `${__dirname}/build`,
    filename: '[name]-[hash].min.js',
  },
  resolve: {
    root: path.resolve( __dirname, 'src' ),
    extensions: [
      '',
      '.js',
      '.vue',
      '.json',
      '.styl',
    ],
    alias: {
      'animation.gsap': path.resolve('src', 'utils/animation.gsap.js'),
      vue: 'vue/dist/vue.js',
    },
  },
  module: {
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'ify',
      },
    ],
    loaders: [
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /node_modules/,
        loader: 'ify',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.styl$/,
        // loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version')
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass')
      // },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader!glslify-loader',
        exclude: /node_modules/,
      },
      {
        test: /animation.gsap\.js$/,
        loader: 'imports?define=>false',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './src/template/index.tpl.html',
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   '__DEV__': JSON.stringify(false),
    //   '__PROD__': JSON.stringify(true)
    // }),
    new webpack.ProvidePlugin({
      Vue: 'vue',
    }),
    new CopyWebpackPlugin([
      { from: 'static' },
    ],
    { ignore: ['.DS_Store', '.keep'] }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //     pure_funcs: ['console.log'],
    //   },
    // }),
    new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
    new CleanWebpackPlugin(['build'], { root: `${__dirname}` }),
    // new StatsWebpackPlugin('webpack.stats.json')
  ],
};
