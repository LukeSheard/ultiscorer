export default async function() {
  if (typeof Promise === "undefined") {
    console.debug("Installing ES6 Promise");
    await import("es6-promise/auto");
  }

  if (typeof fetch === "undefined") {
    console.debug("Installing Fetch");
    await import("isomorphic-fetch");
  }

  if (typeof Symbol.asyncIterator === "undefined") {
    console.debug("Install Symbol");
    await import("core-js/modules/es7.symbol.async-iterator");
  }
}
