import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ListaEstudanteRequisicao,
  ListaEstudanteResposta,
} from '../../../core/entities/lista-estudante.entities';
import { environment } from '../../../../environments/environment';
import { ConsultaEstudanteResposta } from '../../../core/entities/consulta-estudante';

@Injectable()
export class EstudanteService {
  constructor(private http: HttpClient) {}

  listarEstudantes(filtros: ListaEstudanteRequisicao) {
    const requisicao = {
      estudanteId: filtros.estudanteId,
      cursoId: !filtros.cursoId ? 0 : filtros.cursoId,
      turno: !filtros.turno ? '' : filtros.turno,
      semestre: !filtros.semestre ? 0 : filtros.semestre,
      tipoTCC: !filtros.tipoTCC ? '' : filtros.tipoTCC,
      temasIds: !filtros.temasIds ? [] : filtros.temasIds,
      pontosFortesIds: !filtros.pontosFortesIds ? [] : filtros.pontosFortesIds,
    };

    return this.http.post<ListaEstudanteResposta[]>(
      `${environment.apiUrl}/estudantes`,
      requisicao,
    );
  }

  consultarEstudante(estudanteId: number) {
    return this.http.get<ConsultaEstudanteResposta>(
      `${environment.apiUrl}/estudantes/${estudanteId}`,
    );
  }
}
