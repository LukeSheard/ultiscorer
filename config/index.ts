import * as envalid from "envalid";

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production"
}

export interface IAppConfig {
  COOKIE_NAME: string;
  COOKIE_SECRET: string;
  MAILGUN_API_KEY: string;
  MONGODB_URI: string;
  NODE_ENV: NODE_ENV;
  PORT: number;
  SENTRY_DSN: string;
  SENTRY_PUBLIC_DSN: string;
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
      desc: "Database connection URI",
      devDefault: "mongodb://localhost/ultiscorer"
    }),
    NODE_ENV: envalid.str({
      choices: Object.values(NODE_ENV),
      default: NODE_ENV.DEVELOPMENT,
      desc: "App enviroment"
    }),
    PORT: envalid.num({
      desc: "The port the app should listen on",
      devDefault: 8080
    }),
    SENTRY_DSN: envalid.str({
      desc: "Sentry DSN Connection"
    }),
    SENTRY_PUBLIC_DSN: envalid.str({
      desc: "Sentry Front End DSN Connection"
    }),
    WEBPACK_PUBLIC_PATH: envalid.str({
      default: "/",
      desc: "Public path webpack should load chunks from"
    })
  },
  { dotEnvPath: null } as any
);

export const __DEV__ = config.NODE_ENV !== NODE_ENV.PRODUCTION;

export default config;
