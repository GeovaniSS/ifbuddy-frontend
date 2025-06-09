import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristica } from '../../../core/types/caracteristica';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CaracteristicaService {
  constructor(private http: HttpClient) {}

  listarCaracteristicas() {
    return this.http.get<Caracteristica[]>(
      `${environment.apiUrl}/caracteristicas`,
    );
  }
}
