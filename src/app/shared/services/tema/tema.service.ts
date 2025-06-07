import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '../../../core/types/tema';

@Injectable()
export class TemaService {
  constructor(private http: HttpClient) {}

  listarTemas() {
    return this.http.get<Tema[]>('http://localhost:8080/temas');
  }
}
