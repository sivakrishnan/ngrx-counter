import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.action';

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.css'
})
export class CustomCounterInputComponent {
  value: number = 0;
  channelName: string = "Siva";
  constructor(private store: Store<{ counter: CounterState }>) {
  }

  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }
}
