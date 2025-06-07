export interface ListaEstudanteRequisicao {
  estudanteId: number;
  cursoId?: number;
  turno?: string;
  semestre?: number;
  tipoTCC?: string;
  temasIds?: number[];
  pontosFortesIds?: number[];
}

export interface ListaEstudanteResposta {
  estudanteId: number;
  nome: string;
  foto: string;
  nomeCurso: string;
  turno: string;
  semestreAtual: number;
  temas: string[];
}
