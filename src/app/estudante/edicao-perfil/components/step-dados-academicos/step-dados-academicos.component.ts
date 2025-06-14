import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Curso } from '../../../../core/types/curso';
import { TipoTCC } from '../../../../core/enums/tipo-tcc';
import { FormGroup } from '@angular/forms';
import { TurnoCurso } from '../../../../core/enums/turno-curso';
import { CursoService } from '../../../../shared/services/curso/curso.service';

const DEFAULT_TURNOS = [
  {
    label: 'Matutino',
    value: TurnoCurso.MATUTINO,
  },
  {
    label: 'Vespertino',
    value: TurnoCurso.VESPERTINO,
  },
  {
    label: 'Noturno',
    value: TurnoCurso.NOTURNO,
  },
];
const DEFAULT_SEMESTRES = [
  {
    label: '1º Semestre',
    value: 1,
  },
  {
    label: '2º Semestre',
    value: 2,
  },
  {
    label: '3º Semestre',
    value: 3,
  },
  {
    label: '4º Semestre',
    value: 4,
  },
  {
    label: '5º Semestre',
    value: 5,
  },
  {
    label: '6º Semestre',
    value: 6,
  },
  {
    label: '7º Semestre',
    value: 7,
  },
  {
    label: '8º Semestre',
    value: 8,
  },
  {
    label: '9º Semestre',
    value: 9,
  },
  {
    label: '10º Semestre',
    value: 10,
  },
];

@Component({
  selector: 'app-step-dados-academicos',
  templateUrl: './step-dados-academicos.component.html',
  standalone: false,
})
export class StepDadosAcademicosComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  cursosOptions: Curso[] = [];
  turnosOptions = DEFAULT_TURNOS;
  semestresOptions = DEFAULT_SEMESTRES;
  tiposTCCOptions = [
    {
      label: 'Monografia',
      value: TipoTCC.MONOGRAFIA,
    },
    {
      label: 'Artigo Científico',
      value: TipoTCC.ARTIGO,
    },
    {
      label: 'Projeto Técnico',
      value: TipoTCC.PROJETO,
    },
  ];

  constructor(private readonly _cursoService: CursoService) {}

  get curso() {
    return this.formGroup.get('cursoId');
  }

  get turno() {
    return this.formGroup.get('turno');
  }

  get semestreAtual() {
    return this.formGroup.get('semestreAtual');
  }

  get tipoTCC() {
    return this.formGroup.get('tipoTCC');
  }

  get objetivoTCC() {
    return this.formGroup.get('objetivoTCC');
  }

  get descricao() {
    return this.formGroup.get('descricao');
  }

  ngOnInit(): void {
    this.carregarOpcoesFormulario();
    this.curso?.valueChanges.subscribe(cursoId => {
      this.onCursoChange(cursoId);
    });
  }

  carregarOpcoesFormulario() {
    this._cursoService.listarCursos().subscribe(cursos => {
      this.cursosOptions = cursos;
    });
  }

  onCursoChange(cursoId: number) {
    const cursoSelecionado = this.cursosOptions.find(
      curso => curso.cursoId === cursoId,
    );
    if (!cursoSelecionado) return;
    this.turno?.reset();
    this.semestreAtual?.reset();
    this.semestresOptions = DEFAULT_SEMESTRES.slice(
      0,
      cursoSelecionado.duracaoSemestres,
    );
    this.turnosOptions = DEFAULT_TURNOS.filter(turno =>
      cursoSelecionado.turnos?.includes(turno.value),
    );
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
