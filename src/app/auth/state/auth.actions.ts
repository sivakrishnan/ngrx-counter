import { createAction, props } from "@ngrx/store";


export const LOGIN_START = '[auth login] login start'
export const LOGIN_SUCCESS = '[auth login] login success'
export const LOGIN_FAIL = '[auth login] login fail'


export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(LOGIN_SUCCESS);