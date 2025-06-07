import { NgModule } from '@angular/core';
import { PesquisaEstudanteComponent } from './pesquisa-estudante.component';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoService } from '../../../../shared/services/curso/curso.service';
import { TemaService } from '../../../../shared/services/tema/tema.service';
import { CaracteristicaService } from '../../../../shared/services/caracteristica/caracteristica.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PesquisaEstudanteComponent],
  imports: [
    CommonModule,
    CardModule,
    SelectModule,
    MultiSelectModule,
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CursoService, TemaService, CaracteristicaService],
  exports: [PesquisaEstudanteComponent],
})
export class PesquisaEstudanteModule {}
