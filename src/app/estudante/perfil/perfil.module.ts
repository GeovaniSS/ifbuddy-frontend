import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { ConexaoService } from '../../conexoes/services/conexao.service';
import { EstudanteService } from '../../shared/services/estudante/estudante.service';
import { PerfilComponent } from './perfil.component';
import { AvatarModule } from '../../shared/components/avatar/avatar.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    AvatarModule,
  ],
  providers: [EstudanteService, ConexaoService, MessageService],
  exports: [PerfilComponent],
})
export class PerfilModule {}
