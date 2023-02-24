import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store/app.state';
import { loginStart } from '../+store/auth.actions';
import { setLoadingSpinner } from 'src/app/shared/+store/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLoginSubmit() {
    console.log(this.loginForm.value)
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // SHow loading spibnner
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ username, password }));
  }

  confirmUsername() {
    const username = this.loginForm.get('username');

    if (username?.touched && !username.valid) {
      if (username.errors?.['required']) {
        return 'Username field is required'
      }
      if (username.errors?.['minlength']) {
        return ''
      }
    }

    return
  }

  confirmPassword() {
    const password = this.loginForm.get('password');

    if (password?.touched && !password.valid) {
      if (password.errors?.['required']) {
        return 'Password field is required'
      }
      if (password.errors?.['minlength']) {
        return ''
      }
    }

    return
  }

}
