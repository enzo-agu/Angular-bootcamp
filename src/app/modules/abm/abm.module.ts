import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbmRoutingModule } from './abm-routing.module';
import { AbmPageComponent } from './pages/abm-page/abm-page.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AbmPageComponent
  ],
  imports: [
    CommonModule,
    AbmRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AbmModule { }
