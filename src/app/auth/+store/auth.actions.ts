import { createAction, props } from "@ngrx/store";
import { Customer } from "src/app/_models/customer.model";
import { Employee } from "src/app/_models/employee.model";


export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS_EMPLOYEE = '[auth page] login success employee';
export const LOGIN_SUCCESS_CUSTOMER = '[auth page] login success customer';
export const LOGIN_FAILURE = '[auth page] login failure';

export const loginStart = createAction(LOGIN_START,
    props<{ username: string, password: string }>()
);

export const loginSuccessEmployee = createAction(
    LOGIN_SUCCESS_EMPLOYEE,
    props<{ user: Employee }>()
);

export const loginSuccessCustomer = createAction(
    LOGIN_SUCCESS_CUSTOMER,
    props<{ user: Customer }>()
);

export const loginFailure = createAction(LOGIN_FAILURE);