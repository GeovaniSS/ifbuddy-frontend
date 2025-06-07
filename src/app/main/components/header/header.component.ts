import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from '../../../autenticacao/services/usuario.service';
import { Usuario } from '../../../core/types/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
})
export class HeaderComponent implements OnInit {
  usuario: Usuario | null = null;
  items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/perfil', this.usuario?.id]);
      },
    },
    // {
    //   label: 'Configurações',
    //   icon: 'pi pi-cog',
    // },
    {
      label: 'Editar perfil',
      icon: 'pi pi-pencil',
      command: () => {
        this.router.navigate(['/perfil', this.usuario?.id, 'edicao']);
      },
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        this._usuarioService.logout();
      },
    },
  ];

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this._usuarioService.usuario.subscribe(usuario => {
      this.usuario = usuario;
    });
  }
}
