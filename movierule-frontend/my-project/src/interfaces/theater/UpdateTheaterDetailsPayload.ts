export interface UpdateTheaterDetailsPayload {
  theaterId?: string;
  username: string;
  email: string;
  oldPassword?: string;
  password?: string;
  profilePic?: File | null;
}
