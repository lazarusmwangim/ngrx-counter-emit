import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginFailure, loginStart, loginSuccessCustomer, loginSuccessEmployee, signUpFailure, signUpStart } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";
import { AppState } from "src/app/+store/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "src/app/shared/+store/shared.actions";
import { Router } from "@angular/router";
import { signUpSuccess } from "./auth.actions";


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
                            return loginSuccessEmployee({ user: this.authService.formatEmployee(data) });
                        }
                        else if (data?.group_id) {
                            this.store.dispatch(setErrorMessage({ message: '' }))
                            return loginSuccessCustomer({ user: this.authService.formatCustomer(data) })
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
        return this.actions$.pipe(ofType(loginSuccessCustomer),
            tap(action => {
                this.router.navigate(['/'])
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
                            return signUpSuccess();
                        }
                        return signUpFailure();
                    })
                )
            })
        )
    })
}