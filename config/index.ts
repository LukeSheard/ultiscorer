import * as envalid from "envalid";

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production"
}

export interface IAppConfig {
  LOG_LEVEL: string;
  COOKIE_NAME: string;
  COOKIE_SECRET: string;
  MONGODB_URI: string;
  NODE_ENV: NODE_ENV;
  PORT: number;
  WEBPACK_PUBLIC_PATH: string;
}

const config: IAppConfig = envalid.cleanEnv(
  process.env,
  {
    COOKIE_NAME: envalid.str({
      default: "__ULTISCORER__",
      desc: "Name the cookie for user tokens should be stored in"
    }),
    COOKIE_SECRET: envalid.str({
      desc: "Secret String used to encode client cookie",
      devDefault: "secret"
    }),
    MONGODB_URI: envalid.str({
      desc: "Database connection URI"
    }),
    NODE_ENV: envalid.str({
      choices: [NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION],
      default: NODE_ENV.DEVELOPMENT,
      desc: "App enviroment"
    }),
    PORT: envalid.num({
      default: 8080,
      desc: "The port the app should listen on"
    }),
    WEBPACK_PUBLIC_PATH: envalid.str({
      default: "/",
      desc: "Public path webpack should load chunks from"
    })
  },
  { dotEnvPath: null } as any
);

export default config;
