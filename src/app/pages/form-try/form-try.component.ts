import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-form-try',
  templateUrl: './form-try.component.html',
  styleUrls: ['./form-try.component.scss']
})
export class FormTryComponent implements OnInit {


  form;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        d1: this.fb.control(null),
        dt1: this.fb.control(null),
        toppings: this.fb.control([
          "Extra cheese",
          "Mushroom",
          "Onion"
        ]),
        depts: this.fb.control('deptsssssssss')
      }
    );

    // console.log(this.form.get('depts'));

  }

}
