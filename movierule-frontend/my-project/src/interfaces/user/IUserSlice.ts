
export interface UserState {
  user: UserData;
  loading: boolean;
  error: null | string;
  userDetails: UserData;
  groups: any;
  messages: any;
}
export interface AdminState {
  theatre: AdminData;
//   theatreDetails: ITheatre;
  loading: boolean;
  error: null | string;
}

export interface UserData {
  _id: any;
  username: string;
  email: string;
  role?: string | null;
  message: string;
  status: string;
}

export interface AdminData {
  _id: any;
  username: string;
  email: string;
  role?: string | null;
  message: string;
}

export interface IUserSelector {
  user: UserState;
  loading: boolean;
  error: null | string;
}
export interface IAdminSelector {
  admin: AdminState;
  loading: boolean;
  error: null | string;
}
