import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardConexaoComponent } from './card-conexao.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ConexaoService } from '../../services/conexao.service';
import { AvatarModule } from '../../../shared/components/avatar/avatar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardConexaoComponent],
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, AvatarModule],
  providers: [MessageService, ConexaoService],
  exports: [CardConexaoComponent],
})
export class CardConexaoModule {}
