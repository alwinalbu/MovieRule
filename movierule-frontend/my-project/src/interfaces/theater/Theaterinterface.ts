export interface TheaterEntity {
  _id?: string;
  username?: string | null;
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  theaterName?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  phone?: string | null;
  otp?: string[];
  profilePicture?: string | null;
  role: "theatre";
  status: string|null;
}


