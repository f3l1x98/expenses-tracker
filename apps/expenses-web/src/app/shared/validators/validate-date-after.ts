import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

type ValidateDateAfterOptions =
  | ValidateDateAfterWithValue
  | ValidateDateAfterWithFormControl;

interface ValidateDateAfterWithValue {
  value: Date;
  formControlName?: string;
}

interface ValidateDateAfterWithFormControl {
  value?: Date;
  formControlName: string;
}

export function validateDateAfter(
  options: ValidateDateAfterOptions,
): ValidatorFn {
  return (
    control: AbstractControl<Date | undefined>,
  ): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    let beforeValue: Date;
    if (options.value !== undefined) {
      beforeValue = options.value;
    } else {
      const formGroup = control.parent as FormGroup;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      beforeValue = formGroup.controls[options.formControlName!].value;
      if (!(beforeValue instanceof Date)) {
        console.error(
          `The control of ${options.formControlName} is not a valid date.`,
        );
        return null;
      }
    }

    const isAfter = value.getTime() >= beforeValue.getTime();

    return isAfter ? null : { isAfter: false };
  };
}
