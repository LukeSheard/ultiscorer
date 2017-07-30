export default async function() {
  if (typeof Promise === "undefined") {
    console.debug("Installing ES6 Promise");
    await import(/* webpackChunkName: "polyfill-promise" */ "es6-promise/auto");
  }

  if (typeof fetch === "undefined") {
    console.debug("Installing Fetch");
    await import(/* webpackChunkName: "polyfill-fetch" */ "isomorphic-fetch");
  }

  if (typeof Symbol.asyncIterator === "undefined") {
    console.debug("Install Symbol");
    await import(/* webpackChunkName: "polyfill-symbol" */ "core-js/modules/es7.symbol.async-iterator");
  }
}
