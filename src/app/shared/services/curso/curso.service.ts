import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../../../core/types/curso';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CursoService {
  constructor(private http: HttpClient) {}

  listarCursos() {
    return this.http.get<Curso[]>(`${environment.apiUrl}/cursos`);
  }
}
