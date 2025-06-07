import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { AutenticacaoService } from '../services/autenticacao.service';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CadastroComponent],
  providers: [MessageService, AutenticacaoService],
})
export class CadastroModule {}
