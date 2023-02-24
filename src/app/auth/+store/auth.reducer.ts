import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { loginSuccessCustomer, loginSuccessEmployee } from "./auth.actions";

const _authReducer = createReducer(initialAuthState,
    on(loginSuccessCustomer, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }), on(loginSuccessEmployee, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    })
    )

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}