import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrgPickerUserComponent } from '../org-picker-user/org-picker-user.component';







@Component({
  selector: 'ngx-org-picker',
  templateUrl: './org-picker.component.html',
  styleUrls: ['./org-picker.component.scss']
})
export class OrgPickerComponent implements OnInit {


  @Input() testiiii: string;
  @Input() orgControl: FormControl;



  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {


    // console.log(this.testiiii);
    // console.log(this.orgControl);

    // this.orgControl.setValue([{ a: 1 }]);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(OrgPickerUserComponent, {
      width: '70%',
      height: '70%',
      data: this.orgControl.value
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed',result);
      this.orgControl.setValue(result);
      // this.animal = result;
    });
  }



}
