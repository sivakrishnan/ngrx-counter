import { Component, importProvidersFrom } from '@angular/core';
import { CounterOutputComponent } from "../counter-output/counter-output.component";
import { CounterButtonComponent } from "../counter-button/counter-button.component";
import { provideState, provideStore, Store, StoreModule } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { CustomCounterInputComponent } from "../custom-counter-input/custom-counter-input.component";
import { counterReducer } from '../state/counter.reducer';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CounterOutputComponent, CounterButtonComponent, CustomCounterInputComponent],
   templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counter: number = 0;

  onIncrement() {
    this.counter++;
  }

  onDecrement() {
    this.counter--;
  }

  onReset() {
    this.counter = 0;
  }
}
