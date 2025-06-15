import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { CommonModule } from '@angular/common';
import { SpinnerStore } from './spinner.store';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  imports: [CommonModule, BlockUIModule, ProgressSpinnerModule],
})
export class SpinnerComponent {
  #store = inject(SpinnerStore);

  readonly active = this.#store.active;
  readonly label = this.#store.label;
}
