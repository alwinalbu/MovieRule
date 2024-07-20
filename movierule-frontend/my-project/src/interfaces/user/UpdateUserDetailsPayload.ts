export interface UpdateUserDetailsPayload {
  userId?: string;
  username: string;
  email: string;
  password?: string;
  oldPassword?:string;
  profilePic?: File | null;
  city?:string|null;
}
