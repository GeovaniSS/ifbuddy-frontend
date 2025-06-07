import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GerenciarConexaoRequisicao } from '../../../core/entities/gerenciar-conexao.entities';
import { ConexaoService } from '../../services/conexao.service';
import { Conexao } from '../../../core/types/conexao';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/types/usuario';
import { UsuarioService } from '../../../autenticacao/services/usuario.service';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-card-conexao',
  templateUrl: './card-conexao.component.html',
  standalone: false,
})
export class CardConexaoComponent implements OnInit {
  @Input() conexao: Conexao | null = null;
  @Input() isSolicitacao = true;
  @Output() atualizarConexoes = new EventEmitter<void>();

  usuario: Usuario | null = null;

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    public readonly loadingService: LoadingService,
    private readonly _conexaoService: ConexaoService,
    private readonly _usuarioService: UsuarioService,
  ) {}

  get linkWhats() {
    const telefoneFormatado = this.conexao?.parceiro?.telefone?.replace(
      /\D/g,
      '',
    );
    return `https://api.whatsapp.com/send?phone=55${telefoneFormatado}`;
  }

  ngOnInit(): void {
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  async copiarEmailParaClipboard() {
    const email = this.conexao?.parceiro?.email;

    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'E-mail copiado para a área de transferência!',
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível copiar o e-mail.',
      });
    }
  }

  verPerfil() {
    this.router.navigate(['/perfil', this.conexao?.parceiro.id], {
      queryParams: {
        hasConexao: true,
      },
    });
  }

  aceitarConexao() {
    if (!this.usuario) return;
    const requisicao: GerenciarConexaoRequisicao = {
      estudanteId: this.usuario?.id,
      conexaoId: this.conexao?.conexaoId || 0,
    };
    this._conexaoService.aceitarConexao(requisicao).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Conexão',
        detail: `Conexão aceita!`,
        life: 3000,
      });
      this.atualizarConexoes.emit();
    });
  }

  recusarConexao() {
    if (!this.usuario) return;
    const requisicao: GerenciarConexaoRequisicao = {
      estudanteId: this.usuario.id,
      conexaoId: this.conexao?.conexaoId || 0,
    };
    this._conexaoService.recusarConexao(requisicao).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Conexão',
        detail: `Conexão recusada!`,
        life: 3000,
      });
      this.atualizarConexoes.emit();
    });
  }

  desfazerConexao() {
    if (!this.usuario) return;
    const requisicao: GerenciarConexaoRequisicao = {
      estudanteId: this.usuario.id,
      conexaoId: this.conexao?.conexaoId || 0,
    };
    this._conexaoService.desfazerConexao(requisicao).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Conexão',
        detail: `Conexão desfeita!`,
        life: 3000,
      });
      this.atualizarConexoes.emit();
    });
  }
}
