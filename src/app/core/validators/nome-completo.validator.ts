import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nomeCompletoValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const nome = control.value?.trim();

  const isCompleto = nome && /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/.test(nome);

  return isCompleto ? null : { nomeInvalido: true };
}
