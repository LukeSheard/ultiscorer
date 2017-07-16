import * as envalid from "envalid";

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production"
}

export interface IAppConfig {
  LOG_LEVEL: string;
  COOKIE_NAME: string;
  COOKIE_SECRET: string;
  DB_URI: string;
  NODE_ENV: NODE_ENV;
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
    DB_URI: envalid.str({
      desc: "Database connection URI"
    }),
    NODE_ENV: envalid.str({
      choices: [NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION],
      default: NODE_ENV.DEVELOPMENT,
      desc: "App enviroment"
    })
  },
  { dotEnvPath: null } as any
);

export default config;
