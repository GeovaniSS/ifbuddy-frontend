import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { UsuarioService } from '../../autenticacao/services/usuario.service';
import { ConexaoService } from '../../conexoes/services/conexao.service';
import { ConsultaEstudanteResposta } from '../../core/entities/consulta-estudante';
import { SolicitarConexaoRequisicao } from '../../core/entities/solicitar-conexao.entities';
import { Usuario } from '../../core/types/usuario';
import { EstudanteService } from '../../shared/services/estudante/estudante.service';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: false,
})
export class PerfilComponent implements OnInit {
  estudante: ConsultaEstudanteResposta | null = null;
  usuario: Usuario | null = null;
  hasConexao = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    public readonly loadingService: LoadingService,
    private readonly _usuarioService: UsuarioService,
    private readonly _estudanteService: EstudanteService,
    private readonly _conexaoService: ConexaoService,
  ) {}

  get isPersonalProfile() {
    return this.estudante?.estudanteId === this.usuario?.id;
  }

  ngOnInit(): void {
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
    });
    this.activatedRoute.params.subscribe(params => {
      const estudanteId = params['estudanteId'];
      this.carregarPerfil(estudanteId);
    });
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hasConexao = queryParams['hasConexao'] === 'true' ? true : false;
    });
  }

  carregarPerfil(estudanteId: number) {
    this._estudanteService
      .consultarEstudante(estudanteId)
      .subscribe(resposta => {
        this.estudante = resposta;
      });
  }

  voltar() {
    if (this.hasConexao) {
      this.router.navigate(['/conexoes']);
    } else {
      this.router.navigate(['/']);
    }
  }

  conectar() {
    if (!this.estudante || !this.usuario) return;
    const requisicao: SolicitarConexaoRequisicao = {
      solicitanteId: this.usuario.id,
      solicitadoId: this.estudante.estudanteId,
    };
    this._conexaoService.solicitarConexao(requisicao).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Conexão',
        detail: `Solicitação de conexão enviada! \n Acompanhe o status na aba de conexões`,
        life: 3000,
      });
      this.hasConexao = true;
    });
  }
}
