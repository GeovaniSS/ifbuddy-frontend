interface Disponibilidade {
  diaSemana: number;
  textoDiaSemana: string;
  ativo: boolean;
  horarios: {
    manha: boolean;
    tarde: boolean;
    noite: boolean;
  };
  encontros: {
    online: boolean;
    presencial: boolean;
  };
}

export interface DadosPerfil {
  estudanteId: number;
  telefone: string;
  foto: string | null;
  genero: string;
  dataNascimento: string;
  uf: string;
  cidade: string;
  bairro: string;
  trabalha: boolean;
  ocupacao: string | null;
  cursoId: number;
  turno: string;
  semestreAtual: number;
  tipoTCC: string;
  objetivoTCC: string;
  descricao: string;
  temasIds: number[];
  pontosFortesIds: number[];
  pontosFracosIds: number[];
  disponibilidades: Disponibilidade[];
}
