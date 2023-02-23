import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginFailure, loginStart, loginSuccessCustomer, loginSuccessEmployee } from "./auth.actions";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";


@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService
                    .login(action.username, action.password)
                    .pipe(map((data) => {
                        console.log(data);
                        if (data?.success === false) {
                            console.log("Login failure");
                            return loginFailure();
                        }
                        else if (data?.employee_id) {
                            return loginSuccessEmployee({ user: this.authService.formatEmployee(data) });
                        }
                        else if (data?.group_id) {
                            return loginSuccessCustomer({ user: this.authService.formatCustomer(data) })
                        }

                        return loginFailure();
                    }))
            })
        )
    })
}