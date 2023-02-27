import { createAction, props } from "@ngrx/store";
import { Customer } from "src/app/_models/customer.model";
import { Employee } from "src/app/_models/employee.model";


export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS_EMPLOYEE = '[auth page] login success employee';
export const LOGIN_SUCCESS_CUSTOMER = '[auth page] login success customer';
export const LOGIN_FAILURE = '[auth page] login failure';
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup sucess';
export const SIGNUP_FAILURE = '[auth page] signup failure';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';

export const LOGOUT_ACTION = '[auth page] auto logout';

export const loginStart = createAction(LOGIN_START,
    props<{ username: string, password: string }>()
);

export const loginSuccessEmployee = createAction(
    LOGIN_SUCCESS_EMPLOYEE,
    props<{ user: Employee, redirect: boolean }>()
);

export const loginSuccessCustomer = createAction(
    LOGIN_SUCCESS_CUSTOMER,
    props<{ user: Customer, redirect: boolean }>()
);

export const loginFailure = createAction(LOGIN_FAILURE);

export const signUpStart = createAction(
    SIGNUP_START,
    props<{ username: string, password: string }>()
);

export const signUpSuccess = createAction(
    SIGNUP_SUCCESS,
);

export const signUpFailure = createAction(
    SIGNUP_FAILURE,
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);

export const autoLogout = createAction(LOGOUT_ACTION);