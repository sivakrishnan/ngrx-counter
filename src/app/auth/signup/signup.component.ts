import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { setLoadingSpinner } from '../../store/Shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm!: FormGroup;
  private store = inject(Store<AppState>);

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,])
    })
  }

  showEmailError() {
    const controlEmail = this.signUpForm.get('email');
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
    const controlPassword = this.signUpForm.get('password');
    if (controlPassword?.touched && !controlPassword.valid) {
      if (controlPassword?.errors?.['required']) {
        return 'Password is Required';
      }
    }
    return '';
  }

  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}
