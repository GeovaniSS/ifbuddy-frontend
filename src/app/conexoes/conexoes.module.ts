import { NgModule } from '@angular/core';

import { ConexaoService } from './services/conexao.service';
import { ConexoesComponent } from './conexoes.component';
import { CardConexaoModule } from './components/card-conexao/card-conexao.module';
import { CardEmptyModule } from './components/card-empty/card-empty.module';

@NgModule({
  declarations: [ConexoesComponent],
  imports: [CardConexaoModule, CardEmptyModule],
  providers: [ConexaoService],
  exports: [ConexoesComponent],
})
export class ConexoesModule {}
