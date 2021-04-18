import { OrgPickerModule } from './../../modules/org-picker/org-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTryRoutingModule } from './form-try-routing.module';
import { FormTryComponent } from './form-try.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatShareModule } from '../../modules/mat-share/mat-share.module';



@NgModule({
  declarations: [FormTryComponent],
  imports: [
    CommonModule,
    FormTryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatShareModule,
    OrgPickerModule,
  ],
  exports: [],
  providers: [
  ]

})
export class FormTryModule { }

