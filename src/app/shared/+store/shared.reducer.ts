import { createReducer, on } from "@ngrx/store";
import { initialSharedState } from "./shared.state";
import { setErrorMessage, setLoadingSpinner } from "./shared.actions";

const _sharedReducer = createReducer(initialSharedState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }), on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
    
    );

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}