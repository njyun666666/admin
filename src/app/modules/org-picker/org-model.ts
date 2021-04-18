export class OrgModel {
}


export interface DeptModel {
  DeptID: string;
  DeptName: string;
}

export interface UserModel {
  UserID: string;
  UserName: string;
  DeptID?: string;
  DeptName?: string;
}
