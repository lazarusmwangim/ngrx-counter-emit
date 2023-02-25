import { authReducer } from "../auth/+store/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/+store/auth.selectors";
import { AuthState } from "../auth/+store/auth.state";
import { sharedReducer } from "../shared/+store/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/+store/shared.selectors";
import { SharedState } from "../shared/+store/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
    [AUTH_STATE_NAME]: AuthState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME]: authReducer
}