const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.umd.js',
    library: {
      name: 'LCDP_Map',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: {
    leaflet: {
      commonjs: 'leaflet',
      commonjs2: 'leaflet',
      amd: 'leaflet',
      root: 'L'
    }
  }
}; 