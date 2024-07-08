// export interface UserLogin {
//   email: string;
//   password: string;
// }

export interface UserLogin {
  email: string | null;
  password?: string | null;
  role?:string;
}