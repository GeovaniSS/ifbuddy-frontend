import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CadastroRequisicao,
  CadastroResposta,
} from '../../core/entities/cadastro';
import { environment } from '../../../environments/environment';
import { LoginRequisicao, LoginResposta } from '../../core/entities/login';
import { Usuario } from '../../core/types/usuario';

@Injectable()
export class AutenticacaoService {
  constructor(private readonly http: HttpClient) {}

  consultarUsuario(id: number) {
    return this.http.get<Usuario>(
      `${environment.apiUrl}/autenticacao/usuario/${id}`,
    );
  }

  login(requisicao: LoginRequisicao) {
    return this.http.post<LoginResposta>(
      `${environment.apiUrl}/autenticacao/login`,
      requisicao,
    );
  }

  cadastrar(requisicao: CadastroRequisicao) {
    return this.http.post<CadastroResposta>(
      `${environment.apiUrl}/autenticacao/cadastro`,
      requisicao,
    );
  }

  validaToken(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Usuario>(
      `${environment.apiUrl}/autenticacao/valida-token`,
      null,
      { headers },
    );
  }
}
