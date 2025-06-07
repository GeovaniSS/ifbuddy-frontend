import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../../autenticacao/services/usuario.service';
import { filter, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private messsageService: MessageService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.usuarioService.usuario.pipe(
      filter(usuario => usuario !== null),
      map(usuario => {
        if (usuario && !usuario.ativo) {
          this.router.navigate(['/perfil', usuario.id, 'edicao']);
          this.messsageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: `Complete o seu cadastro para utilizar o IFBuddy`,
            life: 3000,
          });
          return false;
        }
        return true;
      }),
    );
  }
}
