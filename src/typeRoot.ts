import { Epic as _Epic } from "redux-observable";
import { Action } from "./actionType";
import { State } from "./stateType";

export type Epic = _Epic<Action, Action, State>;
