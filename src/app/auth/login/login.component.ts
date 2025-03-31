import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  showEmailError() {
    const controlEmail = this.loginForm.get('email');
    if (controlEmail?.touched && !controlEmail.valid) {
      if (controlEmail?.errors?.['required']) {
        return 'Email is Required';
      }
      if (controlEmail?.errors?.['email']) {
        return 'Invalid Email';
      }
    }
    return '';
  }

  showPasswordError() {
    const controlPassword = this.loginForm.get('password');
    if (controlPassword?.touched && !controlPassword.valid) {
      if (controlPassword?.errors?.['required']) {
        return 'Password is Required';
      }
    }
    return '';
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(loginStart({ email, password }));
  }

}
