import debug from "debug";
import { IAppStore } from "../store";

const log = debug("app:routing");

export function createInjectors(store: IAppStore) {
  return {
    injectSaga: (saga: () => Iterator<any>) => store.runSaga(saga)
  };
}

export function createLoadModule(store: IAppStore) {
  const { injectSaga } = createInjectors(store);
  return modImport => {
    return (_, cb) => {
      modImport()
        .catch(error => {
          log(error);
          cb("Error fetching rescource");
        })
        .then(({ default: mod }) => {
          if (mod.saga) {
            log("Injecting saga for route");
            try {
              injectSaga(mod.saga);
            } catch (e) {
              log("Saga error", e);
            }
          }

          return cb(null, mod);
        })
        .catch(error => {
          log(error);
          cb("Error loading page");
        });
    };
  };
}

export function createConnect(store: IAppStore) {
  return fn => {
    return (nextState, replaceState) => fn(store, nextState, replaceState);
  };
}
