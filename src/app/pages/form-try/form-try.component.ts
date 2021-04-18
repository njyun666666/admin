import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-form-try',
  templateUrl: './form-try.component.html',
  styleUrls: ['./form-try.component.scss']
})
export class FormTryComponent implements OnInit {


  form;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        d1: this.fb.control(null),
        dt1: this.fb.control(null),
      }
    );

  }

}
