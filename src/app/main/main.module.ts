import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

import { ConexoesModule } from '../conexoes/conexoes.module';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserGuard } from '../core/guards/user.guard';
import { EdicaoPerfilModule } from '../estudante/edicao-perfil/edicao-perfil.module';
import { PerfilModule } from '../estudante/perfil/perfil.module';
import { HeaderModule } from './components/header/header.module';
import { MainLayoutComponent } from './main-layout.component';
import { MainRoutingModule } from './main-rounting.module';
import { ExplorarModule } from '../estudante/explorar/explorar.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    RouterModule,
    MainRoutingModule,
    ToastModule,
    HeaderModule,
    ExplorarModule,
    ConexoesModule,
    PerfilModule,
    EdicaoPerfilModule,
  ],
  exports: [MainLayoutComponent],
  providers: [AuthGuard, UserGuard],
})
export class MainModule {}
