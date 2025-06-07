import { AutenticacaoService } from './services/autenticacao.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoLayoutComponent } from './autenticacao-layout.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { LoginModule } from './login/login.module';
import { LoginGuard } from '../core/guards/login.guard';
import { ToastModule } from 'primeng/toast';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [AutenticacaoLayoutComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    ToastModule,
    CadastroModule,
    LoginModule,
  ],
  exports: [AutenticacaoLayoutComponent],
  providers: [AutenticacaoService, TokenService, LoginGuard],
})
export class AutenticacaoModule {}
