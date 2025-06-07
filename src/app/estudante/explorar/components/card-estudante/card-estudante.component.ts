import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ListaEstudanteResposta } from '../../../../core/entities/lista-estudante.entities';
import { SolicitarConexaoRequisicao } from '../../../../core/entities/solicitar-conexao.entities';
import { ConexaoService } from '../../../../conexoes/services/conexao.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../autenticacao/services/usuario.service';
import { Usuario } from '../../../../core/types/usuario';

@Component({
  selector: 'app-card-estudante',
  templateUrl: './card-estudante.component.html',
  standalone: false,
})
export class CardEstudanteComponent implements OnInit {
  @Input() estudante: ListaEstudanteResposta | null = null;
  @Input() usuario: Usuario | null = null;
  @Output() conexaoSolicitada = new EventEmitter<void>();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private _conexaoService: ConexaoService,
    private _usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
    });
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
      this.conexaoSolicitada.emit();
    });
  }

  verPerfil() {
    this.router.navigate(['/perfil', this.estudante?.estudanteId], {
      queryParams: { hasConexao: false },
    });
  }
}
