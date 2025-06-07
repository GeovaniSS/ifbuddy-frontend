import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../../../core/types/curso';

@Injectable()
export class CursoService {
  constructor(private http: HttpClient) {}

  listarCursos() {
    return this.http.get<Curso[]>('http://localhost:8080/cursos');
  }
}
