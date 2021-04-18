import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgPickerUserComponent } from './org-picker-user/org-picker-user.component';
import { OrgPickerComponent } from './org-picker/org-picker.component';
import { MatShareModule } from '../mat-share/mat-share.module';



@NgModule({
  declarations: [
    OrgPickerComponent,
    OrgPickerUserComponent,
  ],
  imports: [
    CommonModule,
    MatShareModule
  ],
  exports:[
    OrgPickerComponent
  ]
})
export class OrgPickerModule { }
