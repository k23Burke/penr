var webpack = require("webpack");
var production = process.env.NODE_ENV === 'production';
var CleanPlugin = require('clean-webpack-plugin');

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  debug:   !production,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
    filename:      production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: plugins

};


