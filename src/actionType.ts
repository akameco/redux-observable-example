import { ActionType } from "redux-actions-type";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;
