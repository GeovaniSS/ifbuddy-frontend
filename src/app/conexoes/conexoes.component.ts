import { Component, OnInit } from '@angular/core';
import { ConexaoService } from './services/conexao.service';
import { Conexao } from '../core/types/conexao';
import { UsuarioService } from '../autenticacao/services/usuario.service';
import { Usuario } from '../core/types/usuario';

@Component({
  selector: 'app-conexoes',
  templateUrl: './conexoes.component.html',
  standalone: false,
})
export class ConexoesComponent implements OnInit {
  usuario: Usuario | null = null;
  listaConexaoesConfirmadas: Conexao[] = [];
  listaSolicitacoesConexao: Conexao[] = [];

  constructor(
    private _conexaoService: ConexaoService,
    private _usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
      this.carregarConexoes();
    });
  }

  carregarConexoes() {
    this.carregarConexoesConfirmadasDoEstudante();
    this.carregarSolicitoesDeConexaoDoEstudante();
  }

  carregarConexoesConfirmadasDoEstudante() {
    if (!this.usuario) return;
    this._conexaoService
      .listarConexoesConfirmadasDoEstudante(this.usuario.id)
      .subscribe(resposta => {
        this.listaConexaoesConfirmadas = resposta;
      });
  }

  carregarSolicitoesDeConexaoDoEstudante() {
    if (!this.usuario) return;
    this._conexaoService
      .listarSolicitacoesDeConexaoDoEstudante(this.usuario.id)
      .subscribe(resposta => {
        this.listaSolicitacoesConexao = resposta;
      });
  }
}
