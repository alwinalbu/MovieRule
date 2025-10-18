export interface UpdateTheaterDetailsPayload {
  theaterId?: string;
  username: string;
  email: string;
  oldPassword?: string;
  password?: string;
  city?: string | null;
  profilePic?: File | null;
}
