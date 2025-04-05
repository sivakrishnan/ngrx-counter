import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./counter/counter/counter.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { LoadingSpinnerComponent } from "./shared/components/loading-spinner/loading-spinner.component";
import { Observable } from 'rxjs';
import { getErrorMessage, getLoading } from './store/Shared/shared.selector';
import { AppState } from './store/app.store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { autoLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ngrx-counter';
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;

  private store = inject(Store<AppState>);


  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
