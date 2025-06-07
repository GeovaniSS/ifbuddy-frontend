import { NgModule } from '@angular/core';
import { ExplorarComponent } from './explorar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PesquisaEstudanteModule } from './components/pesquisa-estudante/pesquisa-estudante.module';
import { CardEstudanteModule } from './components/card-estudante/card-estudante.module';

@NgModule({
  declarations: [ExplorarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PesquisaEstudanteModule,
    CardEstudanteModule,
  ],
  exports: [ExplorarComponent],
})
export class ExplorarModule {}
