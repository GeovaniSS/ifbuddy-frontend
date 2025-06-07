import { NgModule } from '@angular/core';
import { CardEstudanteComponent } from './card-estudante.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConexaoService } from '../../../../conexoes/services/conexao.service';
import { AvatarModule } from '../../../../shared/components/avatar/avatar.module';

@NgModule({
  declarations: [CardEstudanteComponent],
  imports: [CardModule, TagModule, ButtonModule, RouterModule, AvatarModule],
  providers: [MessageService, ConexaoService],
  exports: [CardEstudanteComponent],
})
export class CardEstudanteModule {}
