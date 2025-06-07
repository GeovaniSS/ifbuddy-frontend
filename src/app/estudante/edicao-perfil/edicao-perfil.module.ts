import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AvatarModule } from '../../shared/components/avatar/avatar.module';
import { CaracteristicaService } from '../../shared/services/caracteristica/caracteristica.service';
import { CursoService } from '../../shared/services/curso/curso.service';
import { TemaService } from '../../shared/services/tema/tema.service';
import { EnderecoService } from './services/endereco.service';
import { PerfilService } from '../services/perfil.service';
import { StepCaracteristicasComponent } from './components/step-caracteristicas/step-caracteristicas.component';
import { StepDadosAcademicosComponent } from './components/step-dados-academicos/step-dados-academicos.component';
import { StepDadosPessoaisComponent } from './components/step-dados-pessoais/step-dados-pessoais.component';
import { StepDisponibilidadeComponent } from './components/step-disponibilidade/step-disponibilidade.component';
import { EdicaoPerfilComponent } from './edicao-perfil.component';

@NgModule({
  declarations: [
    EdicaoPerfilComponent,
    StepDadosPessoaisComponent,
    StepDadosAcademicosComponent,
    StepCaracteristicasComponent,
    StepDisponibilidadeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AvatarModule,
    CardModule,
    StepperModule,
    ButtonModule,
    SelectModule,
    InputMaskModule,
    DatePickerModule,
    RadioButtonModule,
    CheckboxModule,
    ToggleButtonModule,
    InputTextModule,
    FileUploadModule,
    TextareaModule,
    SelectButtonModule,
    MultiSelectModule,
    MessageModule,
  ],
  providers: [
    TemaService,
    CaracteristicaService,
    CursoService,
    PerfilService,
    EnderecoService,
    MessageService,
  ],
  exports: [EdicaoPerfilComponent],
})
export class EdicaoPerfilModule {}
