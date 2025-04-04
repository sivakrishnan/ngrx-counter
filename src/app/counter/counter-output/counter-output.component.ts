import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { getCounter } from '../state/counter.selectors';


@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css'
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  @Input() counter: any;
  counter$!: Observable<number>;

  counterSubscription: Subscription = new Subscription();
  constructor(private store: Store<CounterState>) {
  }

  ngOnInit() {
    this.counterSubscription = this.store.select('counter').subscribe(data => {
      //this.counter = data.counter;
    })

    this.counter$ = this.store.select(getCounter);
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
