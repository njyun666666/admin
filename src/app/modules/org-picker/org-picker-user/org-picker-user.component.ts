import { UserModel } from './../org-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-org-picker-user',
  templateUrl: './org-picker-user.component.html',
  styleUrls: ['./org-picker-user.component.scss']
})
export class OrgPickerUserComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<OrgPickerUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel[]) { }

  ngOnInit(): void {
    console.log(this.data);

    this.data = [
      {
        UserID: 'u1',
        UserName: 'u name',
      }
    ]


  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
