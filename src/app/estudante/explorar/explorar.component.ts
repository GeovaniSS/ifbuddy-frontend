import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UsuarioService } from '../../autenticacao/services/usuario.service';
import {
  ListaEstudanteRequisicao,
  ListaEstudanteResposta,
} from '../../core/entities/lista-estudante.entities';
import { Usuario } from '../../core/types/usuario';
import { EstudanteService } from '../../shared/services/estudante/estudante.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  standalone: false,
})
export class ExplorarComponent implements OnInit {
  usuario: Usuario | null = null;
  pesquisaForm!: FormGroup;
  listaEstudante: ListaEstudanteResposta[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _estudanteService: EstudanteService,
    private _usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.pesquisaForm = this.formBuilder.group({
      cursoId: [''],
      turno: [''],
      semestre: [''],
      tipoTCC: [''],
      temasIds: [''],
      pontosFortesIds: [''],
    });
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
      this.listarEstudantes();
    });
  }

  listarEstudantes() {
    const filtros: ListaEstudanteRequisicao = {
      estudanteId: this.usuario?.id,
      ...this.pesquisaForm.value,
    };
    this._estudanteService.listarEstudantes(filtros).subscribe(resposta => {
      this.listaEstudante = resposta;
    });
  }
}
