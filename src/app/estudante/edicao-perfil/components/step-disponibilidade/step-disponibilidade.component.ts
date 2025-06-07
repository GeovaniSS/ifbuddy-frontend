import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-step-disponibilidade',
  templateUrl: './step-disponibilidade.component.html',
  standalone: false,
})
export class StepDisponibilidadeComponent {
  @Input() formGroup!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  constructor(public readonly loadingService: LoadingService) {}

  get temas() {
    return this.formGroup.get('temas');
  }

  get dias(): FormArray {
    return this.formGroup.get('disponibilidades') as FormArray;
  }

  getHorariosFormGroup(grupo: AbstractControl): FormGroup {
    return grupo.get('horarios') as FormGroup;
  }

  getEncontrosFormGroup(grupo: AbstractControl): FormGroup {
    return grupo.get('encontros') as FormGroup;
  }

  avancar() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
    }

    this.nextStep.emit();
  }

  voltar() {
    this.previousStep.emit();
  }
}
