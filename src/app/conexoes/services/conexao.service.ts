import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  GerenciarConexaoRequisicao,
  GerenciarConexaoResposta,
} from '../../core/entities/gerenciar-conexao.entities';
import {
  SolicitarConexaoRequisicao,
  SolicitarConexaoResposta,
} from '../../core/entities/solicitar-conexao.entities';
import { Conexao } from '../../core/types/conexao';

@Injectable()
export class ConexaoService {
  constructor(private readonly http: HttpClient) {}

  solicitarConexao(requisicao: SolicitarConexaoRequisicao) {
    return this.http.post<SolicitarConexaoResposta>(
      `${environment.apiUrl}/conexoes`,
      requisicao,
    );
  }

  listarConexoesConfirmadasDoEstudante(estudanteId: number) {
    return this.http.get<Conexao[]>(
      `${environment.apiUrl}/conexoes/${estudanteId}/confirmadas`,
    );
  }

  listarSolicitacoesDeConexaoDoEstudante(estudanteId: number) {
    return this.http.get<Conexao[]>(
      `${environment.apiUrl}/conexoes/${estudanteId}/solicitacoes`,
    );
  }

  aceitarConexao(requisicao: GerenciarConexaoRequisicao) {
    return this.http.put<GerenciarConexaoResposta>(
      `${environment.apiUrl}/conexoes/aceitar`,
      requisicao,
    );
  }

  recusarConexao(requisicao: GerenciarConexaoRequisicao) {
    return this.http.put<GerenciarConexaoResposta>(
      `${environment.apiUrl}/conexoes/recusar`,
      requisicao,
    );
  }

  desfazerConexao(requisicao: GerenciarConexaoRequisicao) {
    return this.http.put<GerenciarConexaoResposta>(
      `${environment.apiUrl}/conexoes/desfazer`,
      requisicao,
    );
  }
}
