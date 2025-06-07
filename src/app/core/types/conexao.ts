import { StatusConexao } from '../enums/status-conexao';

interface Parceiro {
  id: number;
  foto: string | null;
  nome: string;
  email: string | null;
  telefone: string | null;
}

export interface Conexao {
  conexaoId: number;
  parceiro: Parceiro;
  status: StatusConexao;
  dataSolicitacao: string;
  dataAceite: string | null;
  dataEncerramento: string | null;
  ativo: boolean;
}
