import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config: webpack.Configuration = {
  devtool: "source-map",
  entry: {
    main: ["webpack-hot-middleware/client", "./src/client"]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            silent: true
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
              module: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        include: /node_modules/,
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    pathinfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      logLevel: "silent",
      openAnalyzer: false
    })
  ]
};

export default config;
