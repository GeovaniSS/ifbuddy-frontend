import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristica } from '../../../core/types/caracteristica';

@Injectable()
export class CaracteristicaService {
  constructor(private http: HttpClient) {}

  listarCaracteristicas() {
    return this.http.get<Caracteristica[]>(
      'http://localhost:8080/caracteristicas',
    );
  }
}
