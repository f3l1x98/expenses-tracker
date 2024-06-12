import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  standalone: true,
  imports: [CommonModule, BlockUIModule, ProgressSpinnerModule],
})
export class SpinnerComponent {
  spinnerState$ = this.spinnerService.state$;

  constructor(private spinnerService: SpinnerService) {}
}
