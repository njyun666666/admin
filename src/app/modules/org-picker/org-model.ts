export class OrgModel {
}



export interface DeptModel {
  deptID: string;
  deptName: string;
}


export interface ResultUserModel {
  code: number;
  data?: UserModel[];
}


export interface UserModel {
  userID: string;
  userName: string;
  deptID?: string;
  deptName?: string;
}


