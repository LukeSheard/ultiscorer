import * as webpack from "webpack";
import config from "../../../../config";
import createConfig from "../../../../webpack.config";

const compiler = webpack(createConfig(config.NODE_ENV));

export default compiler;
