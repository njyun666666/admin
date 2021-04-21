import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';



export class TestModel {
  account: string;
  bbb: string;
  checked?: boolean = false;
}


@Component({
  selector: 'ngx-form-try',
  templateUrl: './form-try.component.html',
  styleUrls: ['./form-try.component.scss']
})
export class FormTryComponent implements OnInit {

  alist = new TestModel();
  at = new Array<TestModel>();




  form;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.alist.account = "aaa";
    this.alist.bbb = "bbb222";

    // this.at.push({ account: 'a1', bbb: '222' });
    // this.at.push({ account: 'qq', bbb: 'a' });

    this.at = [{ "account": "aaaaaaa1", "bbb": "22aaaaa2" }, { "account": "qqaaaaa", "bbb": "aaaaa" }];






    console.log(this.at);


    const newArray = this.at.map(a => Object.assign({}, a));
    console.log(newArray);





    this.form = this.fb.group(
      {
        d1: this.fb.control(null),
        dt1: this.fb.control(null),
        toppings: this.fb.control([
          "Extra cheese",
          "Mushroom",
          "Onion"
        ]),
        depts: this.fb.control(null)
      }
    );

    // console.log(this.form.get('depts'));

  }

}
