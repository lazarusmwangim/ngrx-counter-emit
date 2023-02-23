import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
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
                        return loginSuccess();
                    }))
            })
        )
    })
}