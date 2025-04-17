import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  imports: [CommonModule, BlockUIModule, ProgressSpinnerModule],
})
export class SpinnerComponent {
  #spinnerService = inject(SpinnerService);

  spinnerState$ = this.#spinnerService.state$;
}
