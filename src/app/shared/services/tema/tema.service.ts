import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '../../../core/types/tema';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TemaService {
  constructor(private http: HttpClient) {}

  listarTemas() {
    return this.http.get<Tema[]>(`${environment.apiUrl}/temas`);
  }
}
