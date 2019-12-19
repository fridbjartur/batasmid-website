// Set to true if you want to export without specific plugin.
const enableFavicons = false;

// Function to disable plugin.
function DisablePlugin() {
  this.apply = function () { };
}

const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const generateHTMLPlugins = () => glob.sync('./src/**/*.html', { ignore: './src/partials/**' }).map(
  dir => new HTMLWebpackPlugin({
    filename: path.basename(dir), // Output
    template: dir, // Input
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  }),
);

module.exports = {
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.js'],
  },
  entry: ['./src/js/app.js', './src/style/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: 'require',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp4)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/static/',
        to: './static/',
      },
    ]),
    ...generateHTMLPlugins(),
    !enableFavicons ? new DisablePlugin() : new FaviconsWebpackPlugin({
      logo: './src/static/favicon.png',
      cache: true,
      outputPath: './static/',
      // Prefix path for generated assets
      prefix: './static/',
      inject: false,

      // Favicons configuration options
      favicons: {
        appName: 'Bátasmíð',
        appDescription: 'Bátasmíð v. Guðmundi S. Norðbúð',
        developerName: 'MIDBERG',
        developerURL: null, // prevent retrieving from the nearest package.json
        background: '#fff',
        theme_color: '#fff',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
