import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TemaService } from '../../../../shared/services/tema/tema.service';
import { CaracteristicaService } from '../../../../shared/services/caracteristica/caracteristica.service';
import { Tema } from '../../../../core/types/tema';
import { Caracteristica } from '../../../../core/types/caracteristica';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-step-caracteristicas',
  templateUrl: './step-caracteristicas.component.html',
  standalone: false,
})
export class StepCaracteristicasComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  temasOptions: Tema[] = [];
  caracteristicasOptions: Caracteristica[] = [];

  constructor(
    private readonly _temaService: TemaService,
    private readonly _caracteristicaService: CaracteristicaService,
  ) {}

  get temas() {
    return this.formGroup.get('temasIds');
  }

  get pontosFortes() {
    return this.formGroup.get('pontosFortesIds');
  }

  get pontosFracos() {
    return this.formGroup.get('pontosFracosIds');
  }

  ngOnInit(): void {
    this.carregarOpcoesFormulario();
  }

  carregarOpcoesFormulario() {
    forkJoin({
      temas: this._temaService.listarTemas(),
      caracteristicas: this._caracteristicaService.listarCaracteristicas(),
    }).subscribe(({ temas, caracteristicas }) => {
      this.temasOptions = temas;
      this.caracteristicasOptions = caracteristicas;
    });
  }

  avancar() {
    if (!this.formGroup.valid) {
      return this.formGroup.markAllAsTouched();
    }

    this.nextStep.emit();
  }

  voltar() {
    this.previousStep.emit();
  }
}
