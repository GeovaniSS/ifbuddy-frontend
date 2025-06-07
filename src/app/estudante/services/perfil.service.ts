import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AtualizarPerfilRequisicao } from '../../core/entities/atualizar-perfil.entities';
import { DadosPerfil } from '../../core/entities/dados-perfil.entities';
import { Usuario } from '../../core/types/usuario';

@Injectable()
export class PerfilService {
  constructor(private http: HttpClient) {}

  consultarPerfilEstudante(estudanteId: number) {
    return this.http.get<DadosPerfil>(
      `${environment.apiUrl}/perfil/${estudanteId}`,
    );
  }

  atualizarPerfilEstudante(requisicao: AtualizarPerfilRequisicao) {
    return this.http.patch<Usuario>(`${environment.apiUrl}/perfil`, requisicao);
  }
}
