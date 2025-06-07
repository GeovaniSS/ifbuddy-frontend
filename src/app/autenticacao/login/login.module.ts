import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { LoginComponent } from './login.component';
import { AutenticacaoService } from '../services/autenticacao.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AutenticacaoService, MessageService],
  exports: [LoginComponent],
})
export class LoginModule {}
