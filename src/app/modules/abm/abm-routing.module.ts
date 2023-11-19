import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmPageComponent } from './pages/abm-page/abm-page.component';

const routes: Routes = [
  {
    path:'',
    component:AbmPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmRoutingModule { }
