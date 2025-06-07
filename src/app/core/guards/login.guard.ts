import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UsuarioService } from '../../autenticacao/services/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  canActivate(): MaybeAsync<GuardResult> {
    if (this.usuarioService.isLogado()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
