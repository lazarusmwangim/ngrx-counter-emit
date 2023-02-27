import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginFailure, loginStart, loginSuccessCustomer, loginSuccessEmployee, signUpFailure, signUpStart } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";
import { AppState } from "src/app/+store/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "src/app/shared/+store/shared.actions";
import { Router } from "@angular/router";
import { signUpSuccess } from "./auth.actions";
import { Customer } from "src/app/_models/customer.model";
import { Employee } from "src/app/_models/employee.model";


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.username, action.password).pipe(
                    map((data) => {
                        console.log(data);
                        // setTimeout(() => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        // }, 1000)

                        if (data?.success === false) {
                            console.log("Login failure");
                            const errorMessage = data.message ? data.message : 'Login failure';
                            this.store.dispatch(setErrorMessage({ message: errorMessage }))
                            return loginFailure();
                        }
                        else if (data?.employee_id) {
                            this.store.dispatch(setErrorMessage({ message: '' }))

                            const user = this.authService.formatEmployee(data);
                            this.authService.setEmployeeInLocalStorage(user);
                            return loginSuccessEmployee({ user, redirect: true });
                        }
                        else if (data?.group_id) {
                            this.store.dispatch(setErrorMessage({ message: '' }));

                            const user = this.authService.formatCustomer(data);
                            this.authService.setCustomerInLocalStorage(user);
                            return loginSuccessCustomer({ user, redirect: true })
                        }

                        return loginFailure();
                    }),
                    /* catchError((errMessage) => {
                        console.log(errMessage);
                        return of();
                    }) */
                );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[loginSuccessCustomer, loginSuccessEmployee]),
            tap(action => {
                if (action.redirect) {
                    this.router.navigate(['/']);
                }
            }
            ))
    },
        { dispatch: false }
    );

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action) => {
                return this.authService.signup(action.username, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        console.log(data);

                        if (data?.success === false) {
                            const message = data.message ? data.message : 'Error signing up.';
                            this.store.dispatch(setErrorMessage({ message }));
                            return signUpFailure();
                        } else if (data?.id) {
                            this.store.dispatch(setErrorMessage({ message: '' }))
                            return signUpSuccess();
                        }
                        return signUpFailure();
                    })
                )
            })
        )
    });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage();
                if (user instanceof Customer) {
                    return of(loginSuccessCustomer({ user, redirect: false }))
                } else if (user instanceof Employee) {
                    return of(loginSuccessEmployee({ user, redirect: false }))
                }

                return of(loginFailure())
            })
        )
    }/* , { dispatch: false } */
    );

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['/auth'])
            }))
    }, { dispatch: false })
}