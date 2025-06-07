import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutenticacaoLayoutComponent } from './autenticacao-layout.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from '../core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacaoRoutingModule {}
