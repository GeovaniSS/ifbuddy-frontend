import { StatusConexao } from '../enums/status-conexao';

export interface GerenciarConexaoRequisicao {
  estudanteId: number;
  conexaoId: number;
}

export interface GerenciarConexaoResposta {
  conexaoId: number;
  solicitanteId: number;
  solicitadoId: number;
  status: StatusConexao;
  dataSolicitacao: string;
  dataAceite: string | null;
  dataEncerramento: string | null;
  ativo: boolean;
}
