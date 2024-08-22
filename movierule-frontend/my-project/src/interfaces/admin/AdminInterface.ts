export interface AdminInterface {
  _id?: string;
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
  role: "admin";
  status?: string;
}
