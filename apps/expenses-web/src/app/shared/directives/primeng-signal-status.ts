import {
  Directive,
  effect,
  HostBinding,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { AutoComplete } from 'primeng/autocomplete';
import { Password } from 'primeng/password';

/**
 * Directive for fixing invalid indicator of PrimeNG components due to missing Signal Form support.
 */
@Directive({
  selector: '[primeNgSignalStatus]',
})
export class PrimeNgSignalStatus {
  // optional formField in order to detect whether the element uses formField or ngModel bridge
  private injectedField = inject(FormField, { self: true, optional: true });

  private passwordComp = inject(Password, { self: true, optional: true });
  private autoCompleteComp = inject(AutoComplete, {
    self: true,
    optional: true,
  });

  f = input.required<FieldTree<unknown, string | number>>({
    alias: 'primeNgSignalStatus',
  });

  // Signal for invalid state for class binding
  private isInvalidState = signal(false);

  constructor() {
    effect(() => {
      const isInvalid = this.f()().invalid();
      const shouldShowError =
        isInvalid && (this.f()().dirty() || this.f()().touched());

      this.applyStyle(shouldShowError);
    });
  }

  // Binding p-invalid class to signal.
  // Done like this instead of renderer.removeClass due to Signal Forms overriding it
  @HostBinding('class.p-invalid')
  get hostInvalid() {
    return this.isInvalidState();
  }

  // Manual "Touched" Bridge
  // focusout bubbles, so it will catch the blur event from
  // the internal input inside p-select, p-inputNumber, etc.
  @HostListener('focusout')
  onBlur() {
    if (!this.injectedField) {
      this.f()().markAsTouched();
    }
  }

  // Manual "Dirty" Bridge
  // Most PrimeNG components emit a native 'change' or 'input' event
  // from their internal elements that bubbles up.
  @HostListener('change')
  @HostListener('input')
  onInput() {
    if (!this.injectedField) {
      this.f()().markAsDirty();
    }
  }

  private applyStyle(isInvalid: boolean) {
    const invalidClass = 'p-invalid';

    if (this.passwordComp || this.autoCompleteComp) {
      // Separate logic for PrimeNG classes that uses inputStyleClass
      const comp: { inputStyleClass: string | undefined } = (this
        .passwordComp ?? this.autoCompleteComp)!;
      this.applyStyleToPrimeNgComp(comp, isInvalid, invalidClass);
    } else {
      // Apply logic for Host Class
      this.isInvalidState.set(isInvalid);
    }
  }

  private applyStyleToPrimeNgComp(
    comp: { inputStyleClass: string | undefined },
    isInvalid: boolean,
    invalidClass: string,
  ) {
    let currentClass = this.passwordComp!.inputStyleClass || '';
    if (isInvalid) {
      if (!currentClass.includes(invalidClass)) {
        comp!.inputStyleClass = `${currentClass} ${invalidClass}`.trim();
      }
    } else {
      comp!.inputStyleClass = currentClass.replace(invalidClass, '').trim();
    }
  }
}
