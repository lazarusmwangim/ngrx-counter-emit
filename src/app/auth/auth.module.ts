import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AUTH_STATE_NAME } from "./+store/auth.selectors";
import { authReducer } from "./+store/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./+store/auth.effects";
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ],
    },
];

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([]),
        StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
        RouterModule.forChild(routes)
    ]
})
export class AuthModule { }