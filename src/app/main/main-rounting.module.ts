import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConexoesComponent } from '../conexoes/conexoes.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserGuard } from '../core/guards/user.guard';
import { EdicaoPerfilComponent } from '../estudante/edicao-perfil/edicao-perfil.component';
import { ExplorarComponent } from '../estudante/explorar/explorar.component';
import { PerfilComponent } from '../estudante/perfil/perfil.component';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExplorarComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'perfil/:estudanteId',
        component: PerfilComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'perfil/:estudanteId/edicao',
        component: EdicaoPerfilComponent,
      },
      {
        path: 'conexoes',
        component: ConexoesComponent,
        canActivate: [UserGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
