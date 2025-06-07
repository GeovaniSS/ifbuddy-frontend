import { Disponibilidade } from '../types/disponibilidade';

export interface ConsultaEstudanteResposta {
  estudanteId: number;
  nome: string;
  foto: string | null;
  nomeCurso: string;
  turno: string;
  semestreAtual: number;
  descricao: string;
  uf: string;
  cidade: string;
  bairro: string;
  ocupacao: string | null;
  trabalha: boolean;
  tipoTCC: string;
  objetivoTCC: string;
  temas: string[];
  pontosFortes: string[];
  pontosFracos: string[];
  disponibilidades: Disponibilidade[];
}
