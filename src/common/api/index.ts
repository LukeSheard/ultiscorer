import { call, select } from "redux-saga/effects";
import { IAppState } from "../reducers";
import installPolyfills from "./polyfill";

installPolyfills();

export default function* get(endpoint: string, options: RequestInit) {
  const headers: any = {
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
    method: options.method || "GET",
    mode: "same-origin",
    redirect: "follow"
  };

  if (options.method !== "GET" && options.body !== null) {
    query.body = JSON.stringify(options.body);
  }

  console.log(token);

  const request = new Request(`/api${endpoint}`, query);

  const response = yield call(fetch, request);

  const body = yield call([response, response.json]);

  // TODO: Deal with error codes
  if (!response.ok) {
    throw new Error(body.error || "There was an error");
  }

  return body;
}
