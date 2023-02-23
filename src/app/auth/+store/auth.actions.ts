import { createAction, props } from "@ngrx/store";


export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILURE = '[auth page] login failure';

export const loginStart = createAction(LOGIN_START,
    props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(LOGIN_SUCCESS)