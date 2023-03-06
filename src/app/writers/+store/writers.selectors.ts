import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WritersState } from "./writers.state";
import { state } from "@angular/animations";


export const WRITER_STATE_NAME = 'writer';

const getWritersState = createFeatureSelector<WritersState>(WRITER_STATE_NAME);

const getWriters = createSelector(
    getWritersState,
    state => {
        return state.writers
    }
);

