import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Cidade } from '../../../../core/entities/ibge-cidades.entities';
import { Estado } from '../../../../core/entities/ibge-estados.entities';
import { Genero } from '../../../../core/enums/genero';
import { EnderecoService } from '../../services/endereco.service';

@Component({
  selector: 'app-step-dados-pessoais',
  templateUrl: './step-dados-pessoais.component.html',
  standalone: false,
})
export class StepDadosPessoaisComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  generosOptions = [
    {
      label: 'Masculino',
      value: Genero.MASCULINO,
    },
    {
      label: 'Feminino',
      value: Genero.FEMININO,
    },
    {
      label: 'Outro',
      value: Genero.OUTRO,
    },
  ];
  estadosOptions: Estado[] = [];
  cidadesOptions: Cidade[] = [];

  get genero() {
    return this.formGroup.get('genero');
  }

  get dataNascimento() {
    return this.formGroup.get('dataNascimento');
  }

  get telefone() {
    return this.formGroup.get('telefone');
  }

  get uf() {
    return this.formGroup.get('uf');
  }

  get cidade() {
    return this.formGroup.get('cidade');
  }

  get bairro() {
    return this.formGroup.get('bairro');
  }

  get trabalha() {
    return this.formGroup.get('trabalha');
  }

  get ocupacao() {
    return this.formGroup.get('ocupacao');
  }

  constructor(private readonly _enderecoService: EnderecoService) {}

  ngOnInit(): void {
    this.carregarEstados();

    this.trabalha?.valueChanges.subscribe(trabalha => {
      if (trabalha === false) {
        this.ocupacao?.setValue('');
        this.ocupacao?.disable();
      } else {
        this.ocupacao?.enable();
      }
    });

    this.uf?.valueChanges.subscribe(uf => {
      const estado = this.estadosOptions.find(estado => estado.sigla === uf);
      if (!estado) return;
      this.carregarCidades(estado);
    });
  }

  carregarEstados() {
    this._enderecoService.listarEstados().subscribe(estados => {
      this.estadosOptions = estados;
    });
  }

  carregarCidades(estado: Estado) {
    this._enderecoService
      .listarCidadesPorEstado(estado.id)
      .subscribe(cidades => {
        this.cidadesOptions = cidades;
      });
  }

  avancar(): void {
    if (!this.formGroup.valid) {
      return this.formGroup.markAllAsTouched();
    }

    this.nextStep.emit();
  }
}
