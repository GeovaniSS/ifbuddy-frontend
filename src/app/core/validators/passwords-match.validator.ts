import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (
  form: AbstractControl,
): ValidationErrors | null => {
  const senha = form.get('senha')?.value;
  const confirmarSenha = form.get('confirmarSenha')?.value;

  return senha === confirmarSenha ? null : { senhasDiferentes: true };
};
