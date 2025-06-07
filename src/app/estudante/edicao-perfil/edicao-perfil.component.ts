import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../autenticacao/services/usuario.service';
import { Usuario } from '../../core/types/usuario';
import { DadosPerfil } from '../../core/entities/dados-perfil.entities';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';

@Component({
  templateUrl: './edicao-perfil.component.html',
  standalone: false,
})
export class EdicaoPerfilComponent implements OnInit {
  activeStep = 1;
  formEdicaoPerfil!: FormGroup;
  usuario: Usuario | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly _usuarioService: UsuarioService,
    private readonly _perfilService: PerfilService,
  ) {}

  get dadosPessoaisForm() {
    return this.formEdicaoPerfil.get('dadosPessoais') as FormGroup;
  }

  get dadosAcademicosForm() {
    return this.formEdicaoPerfil.get('dadosAcademicos') as FormGroup;
  }

  get dadosCaracteristicasForm() {
    return this.formEdicaoPerfil.get('dadosCaracteristicas') as FormGroup;
  }

  get dadosDisponibilidadesForm() {
    return this.formEdicaoPerfil.get('dadosDisponibilidades') as FormGroup;
  }

  ngOnInit(): void {
    this.criarFormularioDeEdicaoDoPerfil();

    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
      this.consultarPerfil();
    });
  }

  criarFormularioDeEdicaoDoPerfil() {
    this.formEdicaoPerfil = this.formBuilder.group({
      dadosPessoais: this.formBuilder.group({
        foto: [null],
        genero: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        telefone: ['', Validators.required],
        trabalha: [false, Validators.required],
        ocupacao: [
          {
            value: '',
            disabled: true,
          },
        ],
        uf: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
      }),
      dadosAcademicos: this.formBuilder.group({
        cursoId: ['', Validators.required],
        turno: ['', Validators.required],
        semestreAtual: ['', Validators.required],
        tipoTCC: ['', Validators.required],
        objetivoTCC: ['', Validators.required],
        descricao: ['', Validators.required],
      }),
      dadosCaracteristicas: this.formBuilder.group({
        temasIds: [[], Validators.required],
        pontosFortesIds: [[], Validators.required],
        pontosFracosIds: [[], Validators.required],
      }),
      dadosDisponibilidades: this.formBuilder.group({
        disponibilidades: this.formBuilder.array([
          this.criarDiaSemanaGroup(1, 'segunda'),
          this.criarDiaSemanaGroup(2, 'terça'),
          this.criarDiaSemanaGroup(3, 'quarta'),
          this.criarDiaSemanaGroup(4, 'quinta'),
          this.criarDiaSemanaGroup(5, 'sexta'),
          this.criarDiaSemanaGroup(6, 'sábado'),
          this.criarDiaSemanaGroup(7, 'domingo'),
        ]),
      }),
    });
  }

  consultarPerfil() {
    if (!this.usuario?.id) return;
    this._perfilService
      .consultarPerfilEstudante(this.usuario.id)
      .subscribe(dadosPerfil => {
        this.preencherFormularioDeEdicaoDoPerfil(dadosPerfil);
      });
  }

  preencherFormularioDeEdicaoDoPerfil(dadosPerfil: DadosPerfil) {
    let dataFormatada = null;

    if (dadosPerfil.dataNascimento) {
      dataFormatada = new Date(dadosPerfil.dataNascimento);
      dataFormatada = new Date(
        dataFormatada.getUTCFullYear(),
        dataFormatada.getUTCMonth(),
        dataFormatada.getUTCDate(),
      );
    }

    this.formEdicaoPerfil.patchValue({
      dadosPessoais: {
        foto: dadosPerfil.foto,
        genero: dadosPerfil.genero,
        dataNascimento: dataFormatada,
        telefone: dadosPerfil.telefone,
        trabalha: dadosPerfil.trabalha || false,
        ocupacao: dadosPerfil.ocupacao,
        uf: dadosPerfil.uf,
        cidade: dadosPerfil.cidade,
        bairro: dadosPerfil.bairro,
      },
      dadosAcademicos: {
        cursoId: dadosPerfil.cursoId,
        turno: dadosPerfil.turno,
        semestreAtual: dadosPerfil.semestreAtual,
        tipoTCC: dadosPerfil.tipoTCC,
        objetivoTCC: dadosPerfil.objetivoTCC,
        descricao: dadosPerfil.descricao,
      },
      dadosCaracteristicas: {
        temasIds: dadosPerfil.temasIds,
        pontosFortesIds: dadosPerfil.pontosFortesIds,
        pontosFracosIds: dadosPerfil.pontosFracosIds,
      },
      dadosDisponibilidades: {
        disponibilidades: dadosPerfil.disponibilidades,
      },
    });
  }

  criarDiaSemanaGroup(diaSemana: number, textoDiaSemana: string): FormGroup {
    return this.formBuilder.group({
      diaSemana: [diaSemana],
      textoDiaSemana: [textoDiaSemana],
      ativo: [false],
      horarios: this.formBuilder.group({
        manha: [false],
        tarde: [false],
        noite: [false],
      }),
      encontros: this.formBuilder.group({
        online: [false],
        presencial: [false],
      }),
    });
  }

  salvar() {
    this._perfilService
      .atualizarPerfilEstudante({
        estudanteId: this.usuario?.id,
        ...this.dadosPessoaisForm.value,
        ...this.dadosAcademicosForm.value,
        ...this.dadosCaracteristicasForm.value,
        ...this.dadosDisponibilidadesForm.value,
      })
      .subscribe(resposta => {
        this._usuarioService.usuarioSubject.next(resposta);
        this.messageService.add({
          severity: 'success',
          summary: 'Conexão',
          detail: `Perfil atualizado!`,
          life: 3000,
        });
        this.router.navigate(['/perfil', this.usuario?.id]);
      });
  }
}
