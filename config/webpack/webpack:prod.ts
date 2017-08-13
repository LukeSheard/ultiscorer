import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  devServer: {
    compress: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "ESNext"
            },
            silent: true,
            transpileOnly: true
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[hash:base64:5]",
              module: true,
              sourceMap: false
            }
          }
        })
      },
      {
        include: /node_modules/,
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: false
            }
          }
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: "[chunkhash].min.css"
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false
      },
      mangle: true,
      sourceMap: true
    })
  ]
};

export default config;
