import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Cidade } from '../../../core/entities/ibge-cidades.entities';
import { Estado } from '../../../core/entities/ibge-estados.entities';

@Injectable()
export class EnderecoService {
  constructor(private readonly http: HttpClient) {}

  listarEstados() {
    return this.http.get<Estado[]>(
      `${environment.ibgeUrl}/localidades/estados?orderBy=nome`,
    );
  }

  listarCidadesPorEstado(estadoId: number) {
    return this.http.get<Cidade[]>(
      `${environment.ibgeUrl}/localidades/estados/${estadoId}/subdistritos?orderBy=nome`,
    );
  }
}
