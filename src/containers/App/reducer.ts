import { Reducer } from "redux";
import { Action } from "../../actionType";

export type State = {
  count: number;
};

const initialState: State = { count: 0 };

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default reducer;
