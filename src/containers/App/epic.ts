import { of } from "rxjs";
import { delay, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "../../typeRoot";
import { increment } from "./actions";

const incrementAsync: Epic = action$ =>
  action$.pipe(
    ofType("incrementAsync"),
    mergeMap(action => of(increment()).pipe(delay(action.delay)))
  );

export const rootEpic = combineEpics(incrementAsync);
