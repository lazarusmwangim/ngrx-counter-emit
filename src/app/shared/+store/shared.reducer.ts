import { createReducer, on } from "@ngrx/store";
import { initialSharedState } from "./shared.state";
import { setLoadingSpinner } from "./shared.actions";

const _sharedReducer = createReducer(initialSharedState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }),
    
    );

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}