import debug from "debug";
import { IAppStore } from "../store";

const log = debug("app:routing");

export function createInjectors(store: IAppStore) {
  return {
    injectSaga: (saga: () => Iterator<any>, state?: any) =>
      store.runSaga(saga, state)
  };
}

export function createLoadModule(store: IAppStore) {
  const { injectSaga } = createInjectors(store);
  return modImport => {
    return (state, cb) => {
      modImport()
        .catch(error => {
          log(error);
          cb("Error fetching rescource");
        })
        .then(({ default: mod }) => {
          if (mod.saga) {
            log("Injecting saga for route");
            try {
              injectSaga(mod.saga, state);
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
