import { createReducer } from "@ngrx/store";
import { initialAuthState } from "./auth.state";

const _authReducer = createReducer(initialAuthState)

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}