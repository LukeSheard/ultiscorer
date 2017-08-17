import debug from "debug";
import { Deserializer } from "jsonapi-serializer";
import { call, select } from "redux-saga/effects";
import { IAppState } from "../reducers";
import installPolyfills from "./polyfill";

installPolyfills();

const log = debug("app:api");
const { deserialize } = new Deserializer({
  keyForAttribute: "camelCase"
});

export interface Headers {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
}

export default function* get(endpoint: string, options?: RequestInit) {
  const headers: Headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const token = yield select(
    (state: IAppState) => state.user && state.user.token
  );

  if (token) {
    headers.Authorization = token;
  }

  const query: RequestInit = {
    credentials: "include",
    headers: new Headers(headers),
    method: (options && options.method) || "GET",
    mode: "same-origin",
    redirect: "follow"
  };

  if (options && options.method !== "GET" && options.body !== null) {
    query.body = JSON.stringify(options.body);
  }

  const request = new Request(`/api${endpoint}`, query);

  const response = yield call(fetch, request);

  const body = yield call([response, response.json]);

  // TODO: Deal with error codes
  if (!response.ok) {
    log(body.error || "Unknown Error");
    throw new Error(body.error || "Unknown Error");
  }

  try {
    return yield deserialize(body);
  } catch (e) {
    log(e);
    return body;
  }
}
