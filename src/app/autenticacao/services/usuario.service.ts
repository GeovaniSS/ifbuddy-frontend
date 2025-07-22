import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { AutenticacaoService } from './autenticacao.service';
import { Router } from '@angular/router';
import { Usuario } from '../../core/types/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private zone: NgZone,
    private _tokenService: TokenService,
    private _autenticacaoService: AutenticacaoService,
  ) {
    // this.validarToken();
  }

  get usuario() {
    return this.usuarioSubject.asObservable();
  }

  get usuarioSubject() {
    return this._usuarioSubject;
  }

  carregarUsuario(id: number) {
    this._autenticacaoService.consultarUsuario(id).subscribe({
      next: usuario => {
        this._usuarioSubject.next(usuario);
      },
      error: () => this.logout(),
    });
  }

  isLogado() {
    return this._tokenService.hasToken();
  }

  login(estudanteId: number, token: string) {
    this._tokenService.setToken(token);
    this.carregarUsuario(estudanteId);
    this.zone.run(() => {
      this.router.navigate(['/']);
    });
  }

  logout() {
    this._tokenService.removeToken();
    this._usuarioSubject.next(null);
    this.zone.run(() => {
      this.router.navigate(['/autenticacao']);
    });
  }

  validarToken() {
    const token = this._tokenService.getToken();
    if (!token) return;
    this._autenticacaoService.validaToken(token).subscribe({
      next: usuario => {
        this._usuarioSubject.next(usuario);
      },
      error: () => {
        this.logout();
      },
    });
  }
}
