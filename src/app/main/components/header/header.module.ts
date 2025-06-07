import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { AvatarModule } from '../../../shared/components/avatar/avatar.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ButtonModule, MenuModule, AvatarModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
