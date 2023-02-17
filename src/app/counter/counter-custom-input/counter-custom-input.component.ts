import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../+store/counter.state';
import { changeChangeChannelName, customIncrement } from '../+store/counter.actions';
import { getChannelName, getCounter } from '../+store/counter.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.css']
})
export class CounterCustomInputComponent implements OnInit {
  value!: number;
  channelName$!: Observable<string>;

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChangeChannelName())
  }
}
