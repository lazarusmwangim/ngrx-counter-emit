import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store/app.state';
import { setLoadingSpinner } from 'src/app/shared/+store/shared.actions';
import { signUpStart } from '../+store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const username = this.signUpForm.value.username;
    const password = this.signUpForm.value.password;

    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signUpStart({ username, password }));
  }

  // Errors handling
  confirmUsername() {
    const username = this.signUpForm.get('username');

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
    const password = this.signUpForm.get('password');

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
