import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { END, Task } from "redux-saga";
import reducer, { IAppState } from "../reducers";

export interface IAppStore extends Store<IAppState> {
  runSaga: (saga: () => Iterator<any>, ...args) => Task;
  close: () => void;
}

export default function(
  history,
  initialState: Partial<IAppState> = {},
  ...middlewares
): IAppStore {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware].concat(
    middlewares
  );

  const store: IAppStore = {
    ...createStore<IAppState>(
      reducer,
      initialState as IAppState,
      composeWithDevTools(applyMiddleware(...middleware))
    ),
    runSaga: sagaMiddleware.run,
    close() {
      this.dispatch(END);
    }
  };
  return store;
}
