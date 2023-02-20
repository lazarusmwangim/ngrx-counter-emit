import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../+store/counter.actions';
import { CounterState } from '../+store/counter.state';
import { AppState } from 'src/app/+store/app.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onIncrement() {
    this.store.dispatch(increment())
  }
  onDecrement() {
    this.store.dispatch(decrement())
  }
  onReset() {
    this.store.dispatch(reset())
  }
}
