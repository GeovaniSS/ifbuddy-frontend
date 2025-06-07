import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailInstitucionalValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const email = control.value?.toLowerCase();

  const pattern = /^[a-z0-9._%+-]+@estudante\.ifb\.edu\.br$/;

  const valido = pattern.test(email);
  return valido ? null : { emailInvalido: true };
}
