import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectChangeEvent } from 'primeng/select';

import { CaracteristicaService } from '../../../../shared/services/caracteristica/caracteristica.service';
import { CursoService } from '../../../../shared/services/curso/curso.service';
import { TemaService } from '../../../../shared/services/tema/tema.service';
import { Caracteristica } from '../../../../core/types/caracteristica';
import { Tema } from '../../../../core/types/tema';
import { Curso } from '../../../../core/types/curso';
import { TurnoCurso } from '../../../../core/enums/turno-curso';
import { TipoTCC } from '../../../../core/enums/tipo-tcc';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

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
  selector: 'app-pesquisa-estudante',
  templateUrl: './pesquisa-estudante.component.html',
  standalone: false,
})
export class PesquisaEstudanteComponent implements OnInit {
  @Input() pesquisaForm!: FormGroup;
  @Output() pesquisar = new EventEmitter<void>();

  cursos: Curso[] = [];
  turnos = DEFAULT_TURNOS;
  semestres = DEFAULT_SEMESTRES;
  tiposTCC = [
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
  temas: Tema[] = [];
  caracteristicas: Caracteristica[] = [];

  constructor(
    private readonly _cursoService: CursoService,
    private readonly _temaService: TemaService,
    private readonly _caracteristicaService: CaracteristicaService,
    public readonly loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      cursos: this._cursoService.listarCursos(),
      temas: this._temaService.listarTemas(),
      caracteristicas: this._caracteristicaService.listarCaracteristicas(),
    }).subscribe(({ cursos, temas, caracteristicas }) => {
      this.cursos = cursos;
      this.temas = temas;
      this.caracteristicas = caracteristicas;
    });
  }

  onCursoChange({ value }: SelectChangeEvent) {
    const cursoSelecionado = this.cursos.find(curso => curso.cursoId === value);
    if (!cursoSelecionado) return;
    this.semestres = DEFAULT_SEMESTRES.slice(
      0,
      cursoSelecionado.duracaoSemestres,
    );
    this.turnos = DEFAULT_TURNOS.filter(turno =>
      cursoSelecionado.turnos?.includes(turno.value),
    );
  }

  limparFiltros() {
    this.pesquisaForm.reset();
    this.semestres = DEFAULT_SEMESTRES;
    this.turnos = DEFAULT_TURNOS;
    this.pesquisar.emit();
  }
}
