import { AbstractControl, ValidatorFn } from '@angular/forms';

export class FormValidations {
  static dateBeforeTodayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date().getTime();

      if (!(control && control.value)) {
        return null;
      } else {
        const date = new Date(control.value).getTime();
        return date > today
          ? {
              invalidDate: true,
            }
          : null;
      }
    };
  }
}
