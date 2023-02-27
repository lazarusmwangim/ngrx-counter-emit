import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { autoLogout, loginSuccessCustomer, loginSuccessEmployee } from "./auth.actions";

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
    }), on(autoLogout, (state) => {
        return {
            ...state,
            user: null
        }
    })
    )

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}