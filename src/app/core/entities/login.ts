export interface LoginRequisicao {
  email: string;
  senha: string;
}

export interface LoginResposta {
  estudanteId: number;
  token: string;
}
