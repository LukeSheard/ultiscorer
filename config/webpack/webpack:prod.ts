import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as ManifestPlugin from "webpack-manifest-plugin";

const config: webpack.Configuration = {
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
              sourceMap: true
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
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  output: {
    filename: "[name][id].min.js"
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: "[chunkhash].min.css"
    }),
    new ManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      logLevel: "silent",
      openAnalyzer: false
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
