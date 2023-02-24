import { sharedReducer } from "../shared/+store/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/+store/shared.selectors";
import { SharedState } from "../shared/+store/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer
}