import debug from "debug";

const log = debug("app:polyfills");

export default async function() {
  if (typeof Promise === "undefined") {
    log("Installing ES6 Promise");
    await import(/* webpackChunkName: "polyfill-promise" */ "es6-promise/auto");
  }

  if (typeof fetch === "undefined") {
    log("Installing Fetch");
    await import(/* webpackChunkName: "polyfill-fetch" */ "isomorphic-fetch");
  }

  if (typeof Symbol.asyncIterator === "undefined") {
    log("Install Symbol");
    await import(/* webpackChunkName: "polyfill-symbol" */ "core-js/modules/es7.symbol.async-iterator");
  }
}
