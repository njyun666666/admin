import { ResultUserModel, UserModel } from './../org-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-org-picker-user',
  templateUrl: './org-picker-user.component.html',
  styleUrls: ['./org-picker-user.component.scss']
})
export class OrgPickerUserComponent implements OnInit {


  oldData: UserModel[];

  result: ResultUserModel;

  constructor(
    public dialogRef: MatDialogRef<OrgPickerUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel[]) { }



  ngOnInit(): void {
    console.log(this.data);

    this.oldData = this.data;


    this.result.code = 0;
    this.result.data = this.data;

    this.data = [
      {
        userID: 'u1',
        userName: 'u name',
      }
    ]


  }


  onOkClick(): void {
    this.result.code = 1;
    this.dialogRef.close(this.result);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
