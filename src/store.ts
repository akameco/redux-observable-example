import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./containers/App/epic";
import rootReducer from "./containers/App/reducer";
import { Action } from "./actionType";
import { State } from "./stateType";

const epicMiddleware = createEpicMiddleware<Action, Action, State>();

export const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
