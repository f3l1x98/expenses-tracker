import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerState } from './spinner-state';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private stateSubject = new BehaviorSubject<SpinnerState>({ active: false });
  state$ = this.stateSubject.asObservable();

  constructor() {}

  public setState(state: SpinnerState) {
    this.stateSubject.next(state);
  }
}
