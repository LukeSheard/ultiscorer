import * as webpack from "webpack";
import config from "../../../../config";
import createConfig from "../../../../webpack.config";

export const webpackConfig = createConfig(config.NODE_ENV);

const compiler = webpack(webpackConfig);

export default compiler;
