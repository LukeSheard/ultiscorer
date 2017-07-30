import { join } from "path";
import * as webpack from "webpack";
import appConfig from "../";

export default function(env: string) {
  const config: webpack.Configuration = {
    context: join(__dirname, "../../"),
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    entry: "./src/client",
    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: "file-loader"
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ["file-loader", "image-webpack-loader"]
        }
      ]
    },
    output: {
      chunkFilename: "[chunkhash].min.js",
      filename: "[chunkhash].min.js",
      path: join(__dirname, "../../", "build"),
      publicPath: appConfig.WEBPACK_PUBLIC_PATH
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        name: "main",
        minChunks(module, count) {
          return (
            module.context && /node_modules/.test(module.context) && count > 3
          );
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks(module, count) {
          return (
            module.context && /node_modules/.test(module.context) && count > 3
          );
        }
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    stats: {
      colors: true
    },
    target: "web"
  };

  return config;
}
