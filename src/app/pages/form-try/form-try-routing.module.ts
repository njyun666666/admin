import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTryComponent } from './form-try.component';

const routes: Routes = [{ path: '', component: FormTryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormTryRoutingModule { }
