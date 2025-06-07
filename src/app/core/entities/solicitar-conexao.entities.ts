import { StatusConexao } from '../enums/status-conexao';

export interface SolicitarConexaoRequisicao {
  solicitanteId: number;
  solicitadoId: number;
}

export interface SolicitarConexaoResposta {
  conexaoId: number;
  solicitanteId: number;
  solicitadoId: number;
  status: StatusConexao;
  dataSolicitacao: string;
  dataAceite: string | null;
  dataEncerramento: string | null;
  ativo: boolean;
}
