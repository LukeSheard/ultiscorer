import * as webpack from "webpack";
import createConfig from "../../../../webpack.config";

const config = createConfig(process.env.NODE_ENV || "development");
const compiler = webpack(config);

export default compiler;
