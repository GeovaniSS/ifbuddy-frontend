import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../../autenticacao/services/usuario.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!this.usuarioService.isLogado()) {
      this.router.navigate(['/autenticacao']);
      return false;
    }

    return true;
  }
}
