import debug from "debug";
import { IAppStore } from "../store";

const log = debug("app:routing");

type Saga = () => Iterator<any>;

export function createInjectors(store: IAppStore) {
  return {
    injectSaga: (saga: Saga | undefined, state?: any) => {
      if (saga !== undefined) {
        log("Injecting saga for route");
        try {
          store.runSaga(saga as Saga, state);
        } catch (e) {
          log("Component Saga error", e);
        }
      }
    }
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
        .then(({ default: mod, saga }) => {
          injectSaga(mod.saga, state);
          injectSaga(saga, state);

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
