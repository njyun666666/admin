import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTryRoutingModule } from './form-try-routing.module';
import { FormTryComponent } from './form-try.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';



var moment = require('moment');


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    // console.log(date,displayFormat);


    if (displayFormat === 'input') {


      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Return the format as per your requirement
      return `${year}/${month}/${day} @@@@`;
    } else {

      console.log('moment ' + displayFormat, moment(date).format('D'));
      // return date.toDateString();
      return moment(date).format(displayFormat);
    }
  }

  // If required extend other NativeDateAdapter methods.
}


// @Injectable()
// export class Custom2DateAdapter extends NgxMatDateAdapter<Date> {
//   format(date: Date, displayFormat: Object): string {
//     // console.log(date,displayFormat);


//     if (displayFormat === 'input') {


//       const day = date.getDate();
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();
//       // Return the format as per your requirement
//       return `${year}/${month}/${day} @@@@`;
//     } else {

//       console.log('moment ' + displayFormat, moment(date).format('D'));
//       // return date.toDateString();
//       return moment(date).format(displayFormat);
//     }
//   }

// }


const matModule = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatIconModule,

  MomentDateModule
];




@NgModule({
  declarations: [FormTryComponent],
  imports: [
    CommonModule,
    FormTryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ...matModule
  ],
  exports: [...matModule],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    // { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['YYYY/MM/DD'],
        },
        display: {
          dateInput: 'YYYY/MM/DD',
          monthYearLabel: 'YYYY/MM',
          dateA11yLabel: 'D',
          monthYearA11yLabel: 'YYYY/MM',
        },
      },
    },
    // {
    //   provide: NgxMatDateAdapter,
    //   useClass: Custom2DateAdapter,
    //   deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // }
    // { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }

  ]

})
export class FormTryModule { }

